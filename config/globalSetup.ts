import dotenv from 'dotenv';
import { resolve } from 'path';

async function globalSetup(): Promise<void> {
  const envFilePath = process.env.test_env
    ? `env/.env.${process.env.test_env}`
    : 'env/.env.model';
  dotenv.config({ path: resolve(envFilePath), override: true });
}

export default globalSetup;
