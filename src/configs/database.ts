import sql from 'mssql';
import 'dotenv/config';

const config: sql.config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: process.env.DB_SERVER!,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME!,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export const connectDB = async (): Promise<sql.ConnectionPool> => {
  try {
    if (pool) return pool; // ♻ reuse connection

    pool = await sql.connect(config);
    console.log('✅ MSSQL connected');
    return pool;
  } catch (error) {
    console.error('❌ MSSQL connection error:', error);
    throw error;
  }
};
