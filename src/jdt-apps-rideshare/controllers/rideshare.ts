import { client } from "../../services/mongo";
import "dotenv/config";
import type { Ride } from "../utils/types";
import type { ObjectId, WithId } from "mongodb";

const database = client.db("jdt_apps_rideshare");
const collection = database.collection<Ride>("ride");

// TODO: Add JSDoc

export async function getAllRides(): Promise<WithId<Ride>[]> {
  const findResult = collection.find({ deleted_at: null });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}

export function getOneRide(id: ObjectId): Promise<WithId<Ride> | null> {
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

export async function deleteRide(id: ObjectId): Promise<boolean> {
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
