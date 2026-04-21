import type { ObjectId } from "mongodb";

export interface Ride {
  id?: ObjectId;
  service: "uber" | "lyft";
  start_time: string;
  account: "sofi" | "chime" | "cashapp";
  fare: number;
  fee: number | null;
  tip: number | null;
  modified_at?: string;
  deleted_at?: string | null;
}
