const request = require('supertest');
const express = require('express');
const profileRoutes = require('../routes/profileRoutes');
const { authenticateToken } = require('../middlewares/authMiddleware');

jest.mock('../controllers/profileController', () => ({
  getProfilesByUserId: jest.fn((req, res) => res.status(200).json({ profiles: [] })),
  createProfile: jest.fn((req, res) => res.status(201).json({ id: 1 })),
  updateProfile: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
  deleteProfile: jest.fn((req, res) => res.sendStatus(200))
}));

// bypass authentication middleware for tests
jest.mock('../middlewares/authMiddleware', () => ({
  authenticateToken: (req, res, next) => next()
}));

const app = express();
app.use(express.json());
app.use('/api/profile', profileRoutes);

describe('Profile Routes', () => {
  it('GET /api/profile/1 calls controller and returns 200', async () => {
    const res = await request(app).get('/api/profile/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ profiles: [] });
  });

  it('POST /api/profile calls controller and returns 201', async () => {
    const payload = { userId: 1, attributeId: 2 };
    const res = await request(app).post('/api/profile').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 1 });
  });

  it('PUT /api/profile/1 calls controller and returns 200', async () => {
    const res = await request(app).put('/api/profile/1').send({ attributeId: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: '1' });
  });

  it('DELETE /api/profile/1 calls controller and returns 200', async () => {
    const res = await request(app).delete('/api/profile/1');
    expect(res.statusCode).toBe(200);
  });
});