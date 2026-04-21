import sqlite from "better-sqlite3";
import { client } from "../../services/mongo";
import "dotenv/config";
import fs from "fs";
import type { Ride } from "../utils/types";

// FIXME: Will be removed in favor of MongoDB
const dbLoc = "./rideshare.db";
const db = new sqlite(dbLoc);

const database = client.db("jdt_apps_rideshare");
const collection = database.collection<Ride>("ride");

// TODO: Add JSDoc

// FIXME: Will need to change
export function dbStartupCheck() {
  console.log("Checking for database file...");
  const file = fs.readFileSync(dbLoc);
  if (file) {
    if (file.length === 0) {
      console.log("Database file empty...initializing.");
      createDB();
    }
  } else {
    console.log("Database file not found...");
    try {
      const file = fs.openSync(dbLoc, "w");
      fs.closeSync(file);
      console.log("Database file created. Initializing.");
      createDB();
    } catch (error) {
      if (error) throw error;
    }
  }
}

function createDB() {
  const rideTableQuery = `CREATE TABLE ride (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service TEXT NOT NULL,
    start_time TEXT NOT NULL,
    account TEXT NOT NULL,
    fare REAL NOT NULL,
    fee REAL,
    tip REAL,
    modified_at TEXT NOT NULL,
    deleted_at TEXT
    );`;

  db.prepare(rideTableQuery).run();
}

// TODO: Set return type
export async function getAllRides() {
  const findResult = collection.find({ deleted_at: null });

  for await (const doc of findResult) {
    return doc;
  }
}

// TODO: id type
// TODO: return type
export function getOneRide(id) {
  const findResult = collection.findOne({ _id: id, deleted_at: null });

  return findResult;
}

export async function addRide(ride: Ride): Promise<boolean> {
  const now = new Date().toISOString();

  try {
    const result = await collection.insertOne({
      service: ride.service,
      start_time: ride.start_time,
      account: ride.account,
      fare: ride.fare,
      fee: ride.fee,
      tip: ride.tip,
      modified_at: now,
    });

    return result.acknowledged;
  } catch (error) {
    return false;
  }
}

// FIXME: Fix _id type
export async function updateRide(ride: Ride): Promise<boolean> {
  const now = new Date().toISOString();
  const query = { _id: ride.id };
  const update = {
    $set: {
      service: ride.service,
      start_time: ride.start_time,
      account: ride.account,
      fare: ride.fare,
      fee: ride.fee,
      tip: ride.tip,
      modified_at: now,
    },
  };
  const options = {};

  try {
    const result = await collection.updateOne(query, update, options);
    return result.acknowledged;
  } catch (error) {
    return false;
  }
}

// FIXME: Fix _id type
export async function deleteRide(id): Promise<boolean> {
  const now = new Date().toISOString();
  const query = { _id: id };
  const update = {
    $set: {
      deleted_at: now,
    },
  };
  const options = {};

  try {
    const result = await collection.updateOne(query, update, options);
    return result.acknowledged;
  } catch (error) {
    return false;
  }
}
