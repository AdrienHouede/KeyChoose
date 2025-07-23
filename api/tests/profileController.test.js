jest.mock('../config/db', () => ({
  execute: jest.fn()
}));
const db = require('../config/db');               // ce db.execute est maintenant un jest.fn()
const { getProfilesByUserId } = require('../controllers/profileController');
const httpMocks = require('node-mocks-http');

describe('getProfilesByUserId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if userId is not a number', async () => {
    const req = httpMocks.createRequest({ params: { id: 'abc' } });
    const res = httpMocks.createResponse();

    await getProfilesByUserId(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'ID utilisateur invalide' });
  });

  it('should return 404 if no profiles found', async () => {
    db.execute.mockResolvedValue([[]]);
    const req = httpMocks.createRequest({ params: { id: '1' } });
    const res = httpMocks.createResponse();

    await getProfilesByUserId(req, res);

    expect(db.execute).toHaveBeenCalled();
    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({ error: 'Aucun profil trouvé' });
  });

  it('should return profiles array when data exists', async () => {
    const mockRows = [{ profileId: 5, userId: 1, attributeId: 2, type: 'QWERTY', layout: 'ISO', size: 100, switch: null, connectivity: '', rgb: 0, material: 'ALU', price: 10.5, profileCreated: '2025-07-22T00:00:00.000Z' }];
    db.execute.mockResolvedValue([mockRows]);
    const req = httpMocks.createRequest({ params: { id: '1' } });
    const res = httpMocks.createResponse();

    await getProfilesByUserId(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ profiles: mockRows });
  });

  it('should handle DB errors with 500', async () => {
    db.execute.mockRejectedValue(new Error('db error'));
    const req = httpMocks.createRequest({ params: { id: '1' } });
    const res = httpMocks.createResponse();

    await getProfilesByUserId(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: 'Erreur serveur' });
  });
});