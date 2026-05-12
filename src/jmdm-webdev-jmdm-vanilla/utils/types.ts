import type { ObjectId } from "mongodb";

export interface Credit {
  id?: ObjectId;
  title: string;
  position: string;
  type: string;
  network?: string;
  production?: string;
  start: number[];
  end: number[];
}
