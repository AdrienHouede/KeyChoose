const httpMocks = require('node-mocks-http');
const db = require('../config/db');
jest.mock('../config/db');

const {
  listKeyboards,
  getKeyboard,
  createKeyboard,
  deleteKeyboard
} = require('../controllers/keyboardController');

describe('keyboardController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('listKeyboards', () => {
    it('should return 200 and list of keyboards', async () => {
      const mockRows = [{ id:1, nom:'K1' }];
      db.execute.mockResolvedValue([mockRows]);
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      await listKeyboards(req, res);

      expect(db.execute).toHaveBeenCalledWith('SELECT * FROM CLAVIER');
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ keyboards: mockRows });
    });

    it('should handle DB error', async () => {
      db.execute.mockRejectedValue(new Error('db error'));
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      await listKeyboards(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ error: 'Erreur serveur' });
    });
  });

  describe('getKeyboard', () => {
    it('should return keyboard if found', async () => {
      const mockRow = [{ id:2, nom:'K2' }];
      db.execute.mockResolvedValue([mockRow]);
      const req = httpMocks.createRequest({ params:{ id:'2' } });
      const res = httpMocks.createResponse();

      await getKeyboard(req, res);

      expect(db.execute).toHaveBeenCalledWith(
        'SELECT * FROM CLAVIER WHERE id = ?',
        [2]
      );
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ keyboard: mockRow[0] });
    });

    it('should return 404 if not found', async () => {
      db.execute.mockResolvedValue([[]]);
      const req = httpMocks.createRequest({ params:{ id:'3' } });
      const res = httpMocks.createResponse();

      await getKeyboard(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ error: 'Clavier non trouvé' });
    });

    it('should handle DB error', async () => {
      db.execute.mockRejectedValue(new Error('fail'));  
      const req = httpMocks.createRequest({ params:{ id:'4' } });
      const res = httpMocks.createResponse();

      await getKeyboard(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ error: 'Erreur serveur' });
    });
  });

  describe('createKeyboard', () => {
    it('should create and return id', async () => {
      db.execute.mockResolvedValue([{ insertId: 10 }]);
      const payload = { nom:'Kbd', image:'img.png', url:'http://', type:'QWERTY', layout:'ISO', size:100, material:'ALU', price:50 };
      const req = httpMocks.createRequest({ body: payload });
      const res = httpMocks.createResponse();

      await createKeyboard(req, res);

      expect(db.execute).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO CLAVIER'),
        expect.any(Array)
      );
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({ id: 10 });
    });

    it('should return 400 on missing fields', async () => {
      const req = httpMocks.createRequest({ body: {} });
      const res = httpMocks.createResponse();

      await createKeyboard(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ error: 'Paramètres manquants' });
    });
  });

  describe('deleteKeyboard', () => {
    it('should delete and return 200', async () => {
      db.execute.mockResolvedValue([{ affectedRows:1 }]);
      const req = httpMocks.createRequest({ params:{ id:'5' } });
      const res = httpMocks.createResponse();

      await deleteKeyboard(req, res);

      expect(db.execute).toHaveBeenCalledWith(
        'DELETE FROM CLAVIER WHERE id = ?',
        [5]
      );
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toBe('');
    });

    it('should return 404 if no row deleted', async () => {
      db.execute.mockResolvedValue([{ affectedRows:0 }]);
      const req = httpMocks.createRequest({ params:{ id:'6' } });
      const res = httpMocks.createResponse();

      await deleteKeyboard(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ error: 'Clavier non trouvé' });
    });
  });
});