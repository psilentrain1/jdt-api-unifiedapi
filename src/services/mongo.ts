import { MongoClient } from "mongodb";
import "dotenv/config";

export const uri = process.env.DB_CONNECTION as string;
export const client = new MongoClient(uri);
