import { getCurrentContext } from "@/helpers/api-operations/get";
import { updateCurrentContext } from "@/helpers/api-operations/update";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Context = "family" | "hobby" | "work";
interface AppContextType {
  context: Context;
  setContext: (context: Context) => void;
  searchTextUpperCase: string;
  searchText: string;
  setSearchText: (search: string) => void;
}

interface AppContextProviderProps {
  children: ReactNode;
}

const apiGetContext = async (setContext: (context: Context) => void) => {
  const context = await getCurrentContext("work");
  setContext(context);
};
const apiSetContext = async (
  context: Context,
  setContext: (context: Context) => void
) => {
  const newContext = await updateCurrentContext(context);
  setContext(newContext);
};

const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}) => {
  const [context, setContext] = useState<Context>("work");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    apiGetContext(setContext);
  }, []);

  const handleContextChange = (context: Context) =>
    apiSetContext(context, setContext);

  return (
    <AppContext.Provider
      value={{
        context,
        setContext: handleContextChange,
        searchTextUpperCase: searchText.toUpperCase(),
        searchText,
        setSearchText,
      }}
    >
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
