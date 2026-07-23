export interface Profile {
  id?: string;
  user_id?: string;
  name?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface UserSettings {
  id?: string;
  user_id?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Business {
  id?: string;
  user_id?: string;
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip5?: number;
  zip4?: number;
  phone?: number;
  modified_at?: string;
  deleted_at?: string;
}

export interface Gig {
  id?: string;
  user_id: string;
  business_id?: string;
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
  id?: string;
  user_id?: string;
  contact_id?: string;
  content?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Invoice {
  id?: string;
  user_id?: string;
  title?: string;
  contact_id?: string;
  status: "draft" | "sent" | "paid" | "overdue" | "void";
  modified_at?: string;
  deleted_at?: string;
}

export interface InvoiceItem {
  id?: string;
  invoice_id?: string;
  description?: string;
  quantity?: number;
  price?: number;
  total?: number;
  modified_at?: string;
  deleted_at?: string;
}

export interface Transaction {
  id?: string;
  user_id?: string;
  contact_id?: string;
  title?: string;
  description?: string;
  category?: string;
  amount?: number;
  date?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Contact {
  id?: string;
  user_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Event {
  id?: string;
  user_id?: string;
  gig_id?: string;
  contact_id?: string;
  title?: string;
  start_time?: string;
  end_time?: string;
  description?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Reminder {
  id?: string;
  user_id?: string;
  event_id?: string;
  contact_id?: string;
  content?: string;
  reminder_time?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Document {
  id?: string;
  user_id?: string;
  contact_id?: string;
  type?: string;
  title?: string;
  uri?: string;
  modified_at?: string;
  deleted_at?: string;
}

export interface Template {
  id?: string;
  user_id?: string;
  type?: string;
  title?: string;
  content?: string;
  modified_at?: string;
  deleted_at?: string;
}
