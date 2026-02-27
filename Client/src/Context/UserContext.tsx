import type { User } from "@/Types";
import { createContext } from "react";

interface Initial {
    user: User | null,
    onlineUsers: number[]
}

const INITIAL:Initial = {
  user: null,
  onlineUsers: [],
};

export const UserContext = createContext(INITIAL);


