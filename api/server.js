const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const authRoutes = require('./routes/authRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const profileRoutes = require('./routes/profileRoutes');
const keyboardRoutes = require('./routes/keyboardRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const redirectRoutes = require('./routes/redirectRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
const app = express();
app.use(cors(), express.json());
connectDB();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/keyboards', keyboardRoutes);
app.use('/api/recommendation', recommendationRoutes);
app.use('/go', redirectRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));