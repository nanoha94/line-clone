import { Timestamp } from "firebase/firestore";

export type Message = {
  id: string;
  text: string;
  uid: string;
  username: string | null;
  photoURL: string | null;
  created_at: Timestamp;
};
