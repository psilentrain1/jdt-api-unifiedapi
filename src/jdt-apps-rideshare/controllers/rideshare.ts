import * as Sentry from "@sentry/node";
import { client } from "../../services/mongo.js";
import type { Ride } from "../utils/types.js";
import type { ObjectId, WithId } from "mongodb";
import { getErrorMessage } from "../../common/utils.js";
import { logger } from "../../services/logging.js";

const log = logger.child({ module: "Rideshare Controllers" });

// TODO: Add JSDoc

function getCollection() {
  return client.db("jdt_apps_rideshare").collection<Ride>("ride");
}

/**
 * Gets a list of all saved rides.
 * @returns Array of Ride objects
 */
export async function getAllRides(): Promise<WithId<Ride>[]> {
  log.trace("getAllRides()");
  Sentry.logger.info("getAllRides()", {
    module: "Rideshare Controllers",
  });
  const findResult = getCollection().find({ deleted_at: null });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}

/**
 * Gets one ride object.
 * @param id ObjectId that corresponds to one ride
 * @returns Ride object
 */
export function getOneRide(id: ObjectId): Promise<WithId<Ride> | null> {
  log.trace(`getOneRide() id: ${id.toHexString()}`);
  Sentry.logger.info("getOneRide()", {
    module: "Rideshare Controllers",
    id: id,
  });
  const findResult = getCollection().findOne({ _id: id, deleted_at: null });

  return findResult;
}

/**
 * Adds one ride to the database.
 * @param ride Ride object
 * @returns Success boolean
 */
export async function addRide(ride: Ride): Promise<boolean> {
  log.trace(`addRide() ride.start_time: ${ride.start_time}`);
  Sentry.logger.info("addRide()", {
    module: "Rideshare Controllers",
    start_time: ride.start_time,
  });
  const now = new Date().toISOString();

  try {
    const result = await getCollection().insertOne({
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
    log.info(`addRide() error: ${getErrorMessage(error)}`);
    Sentry.logger.error("addRide() error", {
      module: "Rideshare Controllers",
      error: error,
    });
    return false;
  }
}

/**
 * Updates one ride.
 * @param ride Ride object
 * @returns Success boolean
 */
export async function updateRide(ride: Ride): Promise<boolean> {
  log.trace(`updateRide() ride.start_time: ${ride.start_time}`);
  Sentry.logger.info("updateRide()", {
    module: "Rideshare Controllers",
    start_time: ride.start_time,
  });
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
    const result = await getCollection().updateOne(query, update, options);
    return result.acknowledged;
  } catch (error) {
    log.info(`updateRide() error: ${getErrorMessage(error)}`);
    Sentry.logger.error("updateRide() error", {
      module: "Rideshare Controllers",
      error: error,
    });
    return false;
  }
}

/**
 * Marks one ride as deleted.
 * @param id ObjectId to be marked as deleted
 * @returns Success boolean
 */
export async function deleteRide(id: ObjectId): Promise<boolean> {
  log.trace(`deleteRide() id: ${id.toHexString()}`);
  Sentry.logger.info("deleteRide()", {
    module: "Rideshare Controllers",
    id: id,
  });
  const now = new Date().toISOString();
  const query = { _id: id };
  const update = {
    $set: {
      deleted_at: now,
    },
  };
  const options = {};

  try {
    const result = await getCollection().updateOne(query, update, options);
    return result.acknowledged;
  } catch (error) {
    log.info(`deleteRide() error: ${getErrorMessage(error)}`);
    Sentry.logger.error("deleteRide() error", {
      module: "Rideshare Controllers",
      error: error,
    });
    return false;
  }
}
