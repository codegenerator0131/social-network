import {
  Client,
  Account,
  Databases,
  Teams,
  Storage,
  Functions,
  ID,
  Query,
} from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);
const teams = new Teams(client);
const storage = new Storage(client);
const functions = new Functions(client);

export { client, account, databases, teams, storage, functions, ID, Query };

// Use 'export type' for type re-exports
export type { Models } from "appwrite";
