import type { ObjectId } from "mongodb";

export interface SiteSetting {
  id?: ObjectId;
  setting: string;
  value?: string;
  modified_at: string;
  deleted_at?: string;
}

export interface Credit {
  id?: ObjectId;
  category: "production" | "music" | "other";
  position: string;
  title: string;
  type?: string;
  network?: string;
  company?: string;
  date_start?: string;
  date_end?: string;
  modified_at: string;
  deleted_at?: string;
}

export interface ResumeInfo {
  id?: ObjectId;
  name: string;
  email: string;
  phone: number;
  modified_at: string;
  deleted_at?: string;
}

export interface Experience {
  id?: ObjectId;
  type: "education" | "work" | "certification";
  name: string;
  company: string;
  date_start?: string;
  date_end?: string;
  location?: string;
  description?: string;
  modified_at: string;
  deleted_at?: string;
}

export interface Post {
  id?: ObjectId;
  title: string;
  status: "draft" | "published" | "archived";
  content: string;
  author: ObjectId;
  modified_at: string;
  deleted_at?: string;
}
