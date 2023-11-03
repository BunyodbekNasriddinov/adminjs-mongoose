import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  DB: {
    connectionString: process.env.DB_URL,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};
