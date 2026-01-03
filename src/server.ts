import 'dotenv/config';
import express from 'express';
import { connectDB } from './configs/database';

const app = express();
const PORT = process.env.PORT || 3000;


(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
