import type { ObjectId } from "mongodb";

export interface SiteSetting {
  _id?: ObjectId;
  setting: string;
  value?: string | null;
  modified_at?: string;
  deleted_at?: string | null;
}

export interface Credit {
  _id?: ObjectId;
  category: "production" | "music" | "other";
  position: string;
  title: string;
  type?: string | null;
  network?: string | null;
  company?: string | null;
  date_start?: string | null;
  date_end?: string | null;
  modified_at?: string;
  deleted_at?: string | null;
}

export interface ResumeInfo {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: number;
  modified_at?: string;
  deleted_at?: string | null;
}

export interface Experience {
  _id?: ObjectId;
  type: "education" | "work" | "certification";
  name: string;
  company: string;
  date_start?: string | null;
  date_end?: string | null;
  location?: string | null;
  description?: string | null;
  modified_at?: string;
  deleted_at?: string | null;
}

export interface Post {
  _id?: ObjectId;
  title: string;
  status: "draft" | "published" | "archived";
  content: string;
  author: ObjectId;
  slug: string;
  modified_at?: string;
  deleted_at?: string | null;
}
