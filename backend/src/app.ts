import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import accessRoutes from './routes/access';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/access', accessRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'total-pacs-backend' });
});

app.listen(port, () => {
  console.log(`PACS backend listening on http://localhost:${port}`);
});
