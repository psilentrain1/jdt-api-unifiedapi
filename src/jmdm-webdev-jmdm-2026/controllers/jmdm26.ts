import { client } from "../../services/mongo";
import { logger } from "../../services/logging";
import type { ObjectId } from "mongodb";
import type {
  SiteSetting,
  Credit,
  ResumeInfo,
  Experience,
  Post,
} from "../utils/types";

const log = logger.child({ module: "JMDM26 Controllers" });

export async function getSiteSettings() {}

export async function updateSiteSettings(
  settings: SiteSetting,
): Promise<boolean> {
  return false;
}

export async function getResumeInfo() {}

export async function updateResumeInfo(
  resumeInfo: ResumeInfo,
): Promise<boolean> {
  return false;
}

export async function getAllCredits() {}

export async function addCredit(credit: Credit): Promise<boolean> {
  return false;
}

export async function getCredit(id: ObjectId) {}

export async function updateCredit(
  id: ObjectId,
  credit: Credit,
): Promise<boolean> {
  return false;
}

export async function deleteCredit(id: ObjectId): Promise<boolean> {
  return false;
}

export async function getAllExp() {}

export async function addExp(exp: Experience): Promise<boolean> {
  return false;
}

export async function getExp(id: ObjectId) {}

export async function updateExp(
  id: ObjectId,
  exp: Experience,
): Promise<boolean> {
  return false;
}

export async function deleteExp(id: ObjectId): Promise<boolean> {
  return false;
}

export async function getAllPosts() {}

export async function addPost(post: Post): Promise<boolean> {
  return false;
}

export async function getPost(id: ObjectId) {}

export async function updatePost(id: ObjectId, post: Post): Promise<boolean> {
  return false;
}

export async function deletePost(id: ObjectId): Promise<boolean> {
  return false;
}
