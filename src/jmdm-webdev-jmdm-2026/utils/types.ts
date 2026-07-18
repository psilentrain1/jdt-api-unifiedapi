import type { ObjectId } from "mongodb";

export interface SiteSetting {
  id?: ObjectId;
  setting: string;
  value?: string | null;
  modified_at?: string;
  deleted_at?: string | null;
}

export interface Credit {
  id?: ObjectId;
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
  id?: ObjectId;
  name: string;
  email: string;
  phone: number;
  modified_at?: string;
  deleted_at?: string | null;
}

export interface Experience {
  id?: ObjectId;
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
  id?: ObjectId;
  title: string;
  status: "draft" | "published" | "archived";
  content: string;
  author: ObjectId;
  modified_at?: string;
  deleted_at?: string | null;
}
