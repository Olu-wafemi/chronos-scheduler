import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Determine environment and load the appropriate .env file
const nodeEnv = process.env.NODE_ENV || 'development';
const envPath = path.resolve(process.cwd(), `.env.${nodeEnv}`);

// If the environment-specific .env file exists, load it
if (fs.existsSync(envPath)) {
  console.log(`Loading environment from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  // Fall back to .env if environment-specific file doesn't exist
  console.log(`Environment file ${envPath} not found, falling back to .env`);
  dotenv.config();
}

@Injectable()
export class PrismaService
  extends PrismaClient<{
    log: ['query', 'info', 'warn', 'error'];
  }>
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    console.log(
      `PrismaService initialized with DATABASE_URL: ${process.env.DATABASE_URL?.substring(0, 20)}...`,
    );
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
