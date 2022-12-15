import * as dotenv from 'dotenv'
dotenv.config()

export const database: string | undefined = process.env.DATABASE_DATA?.trim();
export const port = process.env.BACKEND_PORT || process.env.BACKEND_PORT || process.env.PORT || 3000;
export const jwtSecret = process.env.JWT_SECRET || "Secret JWT";
