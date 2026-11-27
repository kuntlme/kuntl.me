import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d.js';
import contractJson from './contract.json' with { type: 'json' };

export const contract = contractFromJson<Contract>(contractJson);

const globalForDb = globalThis as unknown as {
  prismaDb: ReturnType<typeof postgres<typeof contract>> | undefined;
};

export const db =
  globalForDb.prismaDb ??
  postgres({
    contract,
    url: process.env['DATABASE_URL']!,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.prismaDb = db;
}
