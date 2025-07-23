const httpMocks = require('node-mocks-http');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../config/db');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const { registerUser, loginUser } = require('../controllers/authController');

describe('authController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('registerUser', () => {
    it('should return 400 if missing fields', async () => {
      const req = httpMocks.createRequest({ body:{} });
      const res = httpMocks.createResponse();
      await registerUser(req, res);
      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ error: 'Paramètres invalides' });
    });

    it('should hash password and insert user', async () => {
      bcrypt.hash.mockResolvedValue('hashedpwd');
      db.execute.mockResolvedValue([{ insertId:77 }]);
      const req = httpMocks.createRequest({ body:{ email:'a@b.com', password:'pass', roleId:1 } });
      const res = httpMocks.createResponse();

      await registerUser(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('pass', expect.any(Number));
      expect(db.execute).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO UTILISATEUR'),
        ['a@b.com','hashedpwd',1]
      );
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({ userId: 77 });
    });

    it('should handle DB errors', async () => {
      bcrypt.hash.mockRejectedValue(new Error('fail'));  
      const req = httpMocks.createRequest({ body:{ email:'a@b.com', password:'p' } });
      const res = httpMocks.createResponse();
      await registerUser(req, res);
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ error: 'Erreur serveur' });
    });
  });

  describe('loginUser', () => {
    it('should return 400 on missing fields', async () => {
      const req = httpMocks.createRequest({ body:{} });
      const res = httpMocks.createResponse();
      await loginUser(req, res);
      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ error: 'Paramètres invalides' });
    });

    it('should return 401 on user not found', async () => {
      db.execute.mockResolvedValue([[]]);
      const req = httpMocks.createRequest({ body:{ email:'x@x.com', password:'p' } });
      const res = httpMocks.createResponse();
      await loginUser(req, res);
      expect(res.statusCode).toBe(401);
      expect(res._getJSONData()).toEqual({ error: 'Identifiants incorrects' });
    });

    it('should return 401 on wrong password', async () => {
      db.execute.mockResolvedValue([[{ id:1,email:'u@u',password:'hash' }]]);
      bcrypt.compare.mockResolvedValue(false);
      const req = httpMocks.createRequest({ body:{ email:'u@u', password:'wrong' } });
      const res = httpMocks.createResponse();
      await loginUser(req, res);
      expect(res.statusCode).toBe(401);
      expect(res._getJSONData()).toEqual({ error: 'Identifiants incorrects' });
    });

    it('should return token on success', async () => {
      db.execute.mockResolvedValue([[{ id:2,email:'y@y',password:'hash' }]]);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('jwt.token');
      const req = httpMocks.createRequest({ body:{ email:'y@y', password:'pass' } });
      const res = httpMocks.createResponse();
      await loginUser(req, res);
      expect(jwt.sign).toHaveBeenCalledWith({ userId: 2 }, expect.any(String), expect.any(Object));
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ token: 'jwt.token' });
    });

    it('should handle errors with 500', async () => {
      db.execute.mockRejectedValue(new Error('db fail'));
      const req = httpMocks.createRequest({ body:{ email:'y@y', password:'pass' } });
      const res = httpMocks.createResponse();
      await loginUser(req, res);
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ error: 'Erreur serveur' });
    });
  });
});