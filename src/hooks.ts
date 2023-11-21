import { createContext, useContext } from "react";
import PocketBase from "pocketbase";

const PocketBaseContext = createContext<PocketBase | null>(null);
export const PocketBaseProvider = PocketBaseContext.Provider;

export const usePocketBase = () => {
  const context = useContext(PocketBaseContext);
  if (!context) {
    throw new Error("usePocketBase must be used within a PocketBaseProvider");
  }
  return context;
};
