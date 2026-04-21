import { MongoClient } from "mongodb";

const uri = process.env.DB_CONNECTION as string;
export const client = new MongoClient(uri);
