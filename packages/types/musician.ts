import { User } from "./user";
import { UserDetail } from "./userDetail";

export interface Musician extends User {
  details?: UserDetail | null;
}

export interface MusicianWithInstrument extends Musician {
    instrumentName?: string;
}