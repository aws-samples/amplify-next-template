import { FC, ReactNode, createContext, useContext, useState } from "react";

export type Context = "family" | "hobby" | "work";
interface AppContextType {
  context: Context;
  setContext: (context: Context) => void;
}

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}) => {
  const [context, setContext] = useState<Context>("family");

  return (
    <AppContext.Provider value={{ context, setContext }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
