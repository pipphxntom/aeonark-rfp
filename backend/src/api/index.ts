// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);

app.get('/', (_, res) => res.send('AeonRFP Backend Running ✅'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
