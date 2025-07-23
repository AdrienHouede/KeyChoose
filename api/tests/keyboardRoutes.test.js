const request = require('supertest');
const express = require('express');
const keyboardRoutes = require('../routes/keyboardRoutes');

// Mock controllers
jest.mock('../controllers/keyboardController', () => ({
  listKeyboards: jest.fn((req, res) => res.status(200).json({ keyboards: [] })),
  getKeyboard: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
  createKeyboard: jest.fn((req, res) => res.status(201).json({ id: 42 })),
  deleteKeyboard: jest.fn((req, res) => res.sendStatus(200))
}));

// Bypass authMiddleware
jest.mock('../middlewares/authMiddleware', () => ({
  authenticateToken: (req, res, next) => next()
}));

const app = express();
app.use(express.json());
app.use('/api/keyboards', keyboardRoutes);

describe('Keyboard Routes', () => {
  it('GET /api/keyboards should list keyboards', async () => {
    const res = await request(app).get('/api/keyboards');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ keyboards: [] });
  });

  it('POST /api/keyboards should create a keyboard', async () => {
    const payload = { image: 'img.png', nom: 'KBD', url: 'http://', type: 'QWERTY', layout: 'ISO', size: 100, material: 'ALU', price: 99.99 };
    const res = await request(app).post('/api/keyboards').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 42 });
  });

  it('GET /api/keyboards/:id should return a keyboard', async () => {
    const res = await request(app).get('/api/keyboards/5');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: '5' });
  });

  it('DELETE /api/keyboards/:id should delete a keyboard', async () => {
    const res = await request(app).delete('/api/keyboards/7');
    expect(res.statusCode).toBe(200);
  });
});