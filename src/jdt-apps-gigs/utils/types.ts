import type { ObjectId } from "mongodb";

export interface Profile {
  _id?: ObjectId;
  user_id?: ObjectId;
  name?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface UserSettings {
  _id?: ObjectId;
  user_id?: ObjectId;
  modified_at?: string;
  deleted_at?: string;
}

export interface Business {
  _id?: ObjectId;
  user_id?: ObjectId;
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip5?: number;
  zip4?: number;
  phone?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Gig {
  _id?: ObjectId;
  user_id: ObjectId;
  business_id?: ObjectId;
  title: string;
  type: string;
  status?: "draft" | "pending" | "booked" | "completed" | "canceled";
  start_date?: string;
  end_date?: string;
  description?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Note {
  _id?: ObjectId;
  user_id?: ObjectId;
  contact_id?: ObjectId;
  gig_id?: ObjectId;
  content?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface InvoiceItem {
  _id?: ObjectId;
  description?: string;
  quantity?: number;
  price?: number;
}

export interface Invoice {
  _id?: ObjectId;
  user_id?: ObjectId;
  title?: string;
  contact_id?: ObjectId;
  gig_id?: ObjectId;
  status: "draft" | "sent" | "paid" | "overdue" | "void";
  items?: InvoiceItem[];
  modified_at?: string;
  deleted_at?: string;
}

export interface Transaction {
  _id?: ObjectId;
  user_id?: ObjectId;
  contact_id?: ObjectId;
  gig_id?: ObjectId;
  title?: string;
  description?: string;
  category?: string;
  amount?: number;
  date?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Contact {
  _id?: ObjectId;
  user_id?: ObjectId;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Event {
  _id?: ObjectId;
  user_id?: ObjectId;
  gig_id?: ObjectId;
  contact_id?: ObjectId;
  title?: string;
  start_time?: string;
  end_time?: string;
  description?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Reminder {
  _id?: ObjectId;
  user_id?: ObjectId;
  event_id?: ObjectId;
  contact_id?: ObjectId;
  gig_id?: ObjectId;
  content?: string;
  reminder_time?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Document {
  _id?: ObjectId;
  user_id?: ObjectId;
  contact_id?: ObjectId;
  gig_id?: ObjectId;
  type?: string;
  title?: string;
  uri?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Template {
  _id?: ObjectId;
  user_id?: ObjectId;
  type?: string;
  title?: string;
  content?: string;
  modified_at?: string;
  deleted_at?: string;
}
