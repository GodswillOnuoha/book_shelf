import { PrismaClient } from "@prisma/client";

let db:any = PrismaClient;

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient();
};

db = global.__db;
export { db };
