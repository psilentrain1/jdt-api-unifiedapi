export interface Ride {
  id?: number;
  service: "uber" | "lyft";
  start_time: string;
  account: "sofi" | "chime" | "cashapp";
  fare: number;
  fee: number;
  tip: number;
  modified_at?: string;
  deleted_at?: string;
}
