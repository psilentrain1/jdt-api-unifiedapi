import express from "express";
import { client } from "../../services/mongo";
import { logger } from "../../services/logging";
import { ObjectId } from "mongodb";
import type { WithId } from "mongodb";
import type {
  SiteSetting,
  Credit,
  ResumeInfo,
  Experience,
  Post,
} from "../utils/types";

const log = logger.child({ module: "JMDM26 Controllers" });

function getSiteCollection() {
  return client.db("jmdm_webdev_jmdm_2026").collection<SiteSetting>("site");
}

// getUserCollection()

function getCreditCollection() {
  return client.db("jmdm_webdev_jmdm_2026").collection<Credit>("credit");
}

function getResumeCollection() {
  return client.db("jmdm_webdev_jmdm_2026").collection<ResumeInfo>("resume");
}

function getExpCollection() {
  return client
    .db("jmdm_webdev_jmdm_2026")
    .collection<Experience>("experience");
}

function getPostCollection() {
  return client.db("jmdm_webdev_jmdm_2026").collection<Post>("post");
}

/**
 * Gets a list of all site settings.
 * @returns Array of setting objects.
 */
export async function getSiteSettings(): Promise<WithId<SiteSetting>[]> {
  log.trace("getSiteSettings()");
  const findResult = getSiteCollection().find({ deleted_at: null });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}

// TODO
export async function updateSiteSettings(
  settings: SiteSetting,
): Promise<boolean> {
  return false;
}

/**
 * Gets resume information.
 * @returns Array of ResumeInfo objects.
 */
export async function getResumeInfo(): Promise<WithId<ResumeInfo>[]> {
  log.trace("getResumeInfo()");
  const findResult = getResumeCollection().find({ deleted_at: null });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}

// TODO
export async function updateResumeInfo(
  resumeInfo: ResumeInfo,
): Promise<boolean> {
  return false;
}

/**
 * Gets a list of all credits.
 * @returns Array of credit objects.
 */
export async function getAllCredits(): Promise<WithId<Credit>[]> {
  log.trace("getAllCredits()");
  const findResult = getCreditCollection().find({ deleted_at: null });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}

/**
 * Adds one credit to the database.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Success message or error message.
 */
export async function addCredit(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  const credit = req.body as Credit;
  log.trace(`addCredit() title: ${credit.title}`);
  const now = new Date().toISOString();

  try {
    const result = await getCreditCollection().insertOne({
      category: credit.category,
      position: credit.position,
      title: credit.title,
      type: credit.type,
      network: credit.network,
      company: credit.company,
      date_start: credit.date_start,
      date_end: credit.date_end,
      modified_at: now,
    });

    if (!result.acknowledged) {
      res.status(500).json({ error: "Failed to add credit." });
      return;
    }

    res.status(200).json({ message: "Credit added successfully." });
  } catch {
    res.status(500).json({ error: "Failed to add credit." });
  }
}

/**
 * Gets one credit by its _id.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Credit object or error message.
 */
export async function getCredit(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  const { id } = req.params as { id: string };
  log.trace(`getCredit() id: ${id}`);

  try {
    const _id = ObjectId.createFromHexString(id);
    const findResult = await getCreditCollection().findOne({
      _id,
      deleted_at: null,
    });

    if (!findResult) {
      res.status(404).json({ error: "Credit not found." });
      return;
    }

    res.status(200).json(findResult);
  } catch {
    res.status(400).json({ error: "Invalid id format." });
  }
}

/**
 * Updates a credit by its _id.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Success message or error message.
 */
export async function updateCredit(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  const credit = req.body as Credit;
  log.trace(`updateCredit() id: ${req.params.id}`);
  const now = new Date().toISOString();
  const query = { _id: credit.id };
  const update = {
    $set: {
      category: credit.category,
      position: credit.position,
      title: credit.title,
      type: credit.type,
      network: credit.network,
      company: credit.company,
      date_start: credit.date_start,
      date_end: credit.date_end,
      modified_at: now,
    },
  };
  const options = {};

  try {
    const result = await getCreditCollection().updateOne(
      query,
      update,
      options,
    );
    if (!result.acknowledged) {
      res.status(500).json({ error: "Failed to update credit." });
      return;
    }

    res.status(200).json({ message: "Credit updated successfully." });
  } catch {
    res.status(500).json({ error: "Failed to update credit." });
  }
}

/**
 * Deletes a credit by its _id.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Success message or error message.
 */
export async function deleteCredit(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  const { id } = req.params as { id: string };
  log.trace(`deleteCredit() id: ${id}`);
  const now = new Date().toISOString();
  const update = {
    $set: {
      deleted_at: now,
    },
  };
  const options = {};

  try {
    const result = await getCreditCollection().updateOne(
      { _id: ObjectId.createFromHexString(id) },
      update,
      options,
    );

    if (!result.acknowledged) {
      res.status(500).json({ error: "Failed to delete credit." });
      return;
    }

    res.status(200).json({ message: "Credit deleted successfully." });
  } catch {
    res.status(500).json({ error: "Failed to delete credit." });
  }
}

/**
 * Gets a list of all experiences.
 * @returns Array of Experience objects.
 */
export async function getAllExp(): Promise<WithId<Experience>[]> {
  log.trace("getAllExp()");
  const findResult = getExpCollection().find({ deleted_at: null });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}

/**
 * Adds one experience to the database.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Success message or error message.
 */
export async function addExp(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  const exp = req.body as Experience;
  log.trace(`addExp() company: ${exp.company}`);
  const now = new Date().toISOString();

  try {
    const result = await getExpCollection().insertOne({
      type: exp.type,
      name: exp.name,
      company: exp.company,
      date_start: exp.date_start,
      date_end: exp.date_end,
      location: exp.location,
      description: exp.description,
      modified_at: now,
    });

    if (!result.acknowledged) {
      res.status(500).json({ error: "Failed to add experience." });
      return;
    }

    res.status(200).json({ message: "Experience added successfully." });
  } catch {
    res.status(500).json({ error: "Failed to add experience." });
  }
}

/**
 * Gets one experience by its _id.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Experience object or error message.
 */
export async function getExp(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  const { id } = req.params as { id: string };
  log.trace(`getExp() id: ${id}`);

  try {
    const _id = ObjectId.createFromHexString(id);
    const findResult = await getExpCollection().findOne({
      _id,
      deleted_at: null,
    });

    if (!findResult) {
      res.status(404).json({ error: "Experience not found." });
      return;
    }

    res.status(200).json(findResult);
  } catch {
    res.status(400).json({ error: "Invalid id format." });
  }
}

/**
 * Updates an experience by its _id.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Success message or error message.
 */
export async function updateExp(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  const exp = req.body as Experience;
  log.trace(`updateExp() id: ${exp.id}`);
  const now = new Date().toISOString();
  const query = { _id: exp.id };
  const update = {
    $set: {
      type: exp.type,
      name: exp.name,
      company: exp.company,
      date_start: exp.date_start,
      date_end: exp.date_end,
      location: exp.location,
      description: exp.description,
      modified_at: now,
    },
  };
  const options = {};

  try {
    const result = await getExpCollection().updateOne(query, update, options);
    if (!result.acknowledged) {
      res.status(500).json({ error: "Failed to update experience." });
      return;
    }

    res.status(200).json({ message: "Experience updated successfully." });
  } catch {
    res.status(500).json({ error: "Failed to update experience." });
  }
}

/**
 * Deletes an experience by its _id.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Success message or error message.
 */
export async function deleteExp(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  const { id } = req.params as { id: string };
  log.trace(`deleteExp() id: ${id}`);
  const now = new Date().toISOString();
  const update = {
    $set: {
      deleted_at: now,
    },
  };
  const options = {};

  try {
    const result = await getExpCollection().updateOne(
      { _id: ObjectId.createFromHexString(id) },
      update,
      options,
    );

    if (!result.acknowledged) {
      res.status(500).json({ error: "Failed to delete experience." });
      return;
    }

    res.status(200).json({ message: "Experience deleted successfully." });
  } catch {
    res.status(500).json({ error: "Failed to delete experience." });
  }
}

/**
 * Gets a list of all posts.
 * @returns Array of Post objects.
 */
export async function getAllPosts(): Promise<WithId<Post>[]> {
  log.trace("getAllPosts()");
  const findResult = getPostCollection().find({ deleted_at: null });

  const results = [];
  for await (const doc of findResult) {
    results.push(doc);
  }
  return results;
}

/**
 * Adds one post to the database.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Success message or error message.
 */
export async function addPost(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  const post = req.body as Post;
  log.trace(`addPost() title: ${post.title}`);
  const now = new Date().toISOString();

  try {
    const result = await getPostCollection().insertOne({
      title: post.title,
      status: post.status,
      content: post.content,
      author: post.author,
      modified_at: now,
    });

    if (!result.acknowledged) {
      res.status(500).json({ error: "Failed to add post." });
      return;
    }

    res.status(200).json({ message: "Post added successfully." });
  } catch {
    res.status(500).json({ error: "Failed to add post." });
  }
}

/**
 * Gets one post by its _id.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Post object or error message.
 */
export async function getPost(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  const { id } = req.params as { id: string };
  log.trace(`getPost() id: ${id}`);

  try {
    const _id = ObjectId.createFromHexString(id);
    const findResult = await getPostCollection().findOne({
      _id,
      deleted_at: null,
    });

    if (!findResult) {
      res.status(404).json({ error: "Post not found." });
      return;
    }

    res.status(200).json(findResult);
  } catch {
    res.status(400).json({ error: "Invalid id format." });
  }
}

/**
 * Updates a post by its _id.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Success message or error message.
 */
export async function updatePost(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  const post = req.body as Post;
  log.trace(`updatePost() id: ${post.id}`);
  const now = new Date().toISOString();
  const query = { _id: post.id };
  const update = {
    $set: {
      title: post.title,
      status: post.status,
      content: post.content,
      author: post.author,
      modified_at: now,
    },
  };
  const options = {};

  try {
    const result = await getPostCollection().updateOne(query, update, options);
    if (!result.acknowledged) {
      res.status(500).json({ error: "Failed to update post." });
      return;
    }

    res.status(200).json({ message: "Post updated successfully." });
  } catch {
    res.status(500).json({ error: "Failed to update post." });
  }
}

/**
 * Deletes a post by its _id.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Success message or error message.
 */
export async function deletePost(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  const { id } = req.params as { id: string };
  log.trace(`deletePost() id: ${id}`);
  const now = new Date().toISOString();
  const update = {
    $set: {
      deleted_at: now,
    },
  };
  const options = {};

  try {
    const result = await getPostCollection().updateOne(
      { _id: ObjectId.createFromHexString(id) },
      update,
      options,
    );

    if (!result.acknowledged) {
      res.status(500).json({ error: "Failed to delete post." });
      return;
    }

    res.status(200).json({ message: "Post deleted successfully." });
  } catch {
    res.status(500).json({ error: "Failed to delete post." });
  }
}
