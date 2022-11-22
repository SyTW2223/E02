import * as dotenv from 'dotenv'
dotenv.config()

export const databaseHost: string | undefined = process.env.DATABASE_HOST?.trim();
export const databasePort: string | undefined = process.env.DATABASE_PORT?.trim();
export const databaseUser: string | undefined = process.env.DATABASE_USER?.trim();
export const databasePassword: string | undefined = process.env.DATABASE_PASSWORD?.trim();
export const databaseName: string | undefined = process.env.DATABASE_NAME?.trim();
export const databaseConnectionOpts: string | undefined = process.env.DATABASE_CONNECTION_OPTIONS?.trim();
export const port = process.env.BACKEND_PORT || process.env.BACKEND_PORT || process.env.PORT || 3000;;
