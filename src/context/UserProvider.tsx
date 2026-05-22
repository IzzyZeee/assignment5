import type { ReactNode } from "react";
import { UserContext } from "@/context";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => { // stuff shared by the whole ahh website
  return <UserContext.Provider value={undefined}>{children}</UserContext.Provider>;
};