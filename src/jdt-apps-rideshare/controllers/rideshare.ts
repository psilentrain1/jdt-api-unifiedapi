import sqlite from "better-sqlite3";
import fs from "fs";
import type { Ride } from "../utils/types";

const dbLoc = "./rideshare.db";
const db = new sqlite(dbLoc);

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

export function getAllRides(): Ride[] {
  const stmt = db.prepare("SELECT * FROM ride WHERE deleted_at IS NULL;");

  return stmt.all() as Ride[];
}

export function getOneRide(id: number): Ride {
  const stmt = db.prepare("SELECT * FROM ride WHERE id = ?;");

  return stmt.get(id) as Ride;
}

export function addRide(ride: Ride): boolean {
  const stmt = db.prepare(
    "INSERT INTO ride (service, start_time, account, fare, fee, tip, modified_at) VALUES (?, ?, ?, ?, ?, ?, ?);",
  );
  const now = new Date().toISOString();

  const result = stmt.run(
    ride.service,
    ride.start_time,
    ride.account,
    ride.fare,
    ride.fee,
    ride.tip,
    now,
  );

  if (result.changes > 0) {
    return true;
  }

  return false;
}

export function updateRide(ride: Ride): boolean {
  const stmt = db.prepare(
    "UPDATE ride SET service = ?, start_time = ?, account = ?, fare = ?, fee = ?, tip = ?, modified_at = ? WHERE id = ?;",
  );
  const now = new Date().toISOString();

  const result = stmt.run(
    ride.service,
    ride.start_time,
    ride.account,
    ride.fare,
    ride.fee,
    ride.tip,
    now,
    ride.id,
  );

  if (result.changes > 0) {
    return true;
  }

  return false;
}

export function deleteRide(id: number): boolean {
  const stmt = db.prepare("UPDATE ride SET deleted_at = ? WHERE id = ?;");
  const now = new Date().toISOString();

  const result = stmt.run(now, id);

  if (result.changes > 0) {
    return true;
  }

  return false;
}
