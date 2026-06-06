import { client } from "../../services/mongo";
import type { Credit } from "../utils/types";
import type { WithId } from "mongodb";
import { logger } from "../../services/logging";

const log = logger.child({ module: "JMDM Controllers" });

function getCollection() {
  return client.db("jmdm_webdev_jmdm_vanilla").collection<Credit>("credit");
}

export async function getAllCredits(): Promise<WithId<Credit>[]> {
  log.trace("getAllCredits()");
  const findResult = getCollection().find();

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}
