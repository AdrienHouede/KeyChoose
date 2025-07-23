const authRoutes = require('../routes/authRoutes');
const { registerUser, loginUser } = require('../controllers/authController');

jest.mock('../controllers/authController', () => ({
  registerUser: jest.fn((req, res) => res.status(201).json({ userId: 99 })),
  loginUser: jest.fn((req, res) => res.status(200).json({ token: 'jwt-token' }))
}));

const appAuth = express();
appAuth.use(express.json());
appAuth.use('/api/auth', authRoutes);

describe('Auth Routes', () => {
  it('POST /api/auth/register should create a user', async () => {
    const res = await request(appAuth)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'secret', roleId: 1 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ userId: 99 });
  });

  it('POST /api/auth/login should authenticate a user', async () => {
    const res = await request(appAuth)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'secret' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ token: 'jwt-token' });
  });
});