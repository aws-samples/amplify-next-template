import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Context = "family" | "hobby" | "work";
export type SetContextStateFn = (context: Context) => void;

interface AppContextType {
  context?: Context;
  setContext: SetContextStateFn;
}

type ContextHookResult = {
  getContext: (setContext: SetContextStateFn, fallBackContext: Context) => void;
  saveContext: SetContextStateFn;
};

interface AppContextProviderProps {
  children: ReactNode;
  useContextHook: () => ContextHookResult;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
  useContextHook,
}) => {
  const [context, setContext] = useState<Context>();
  const { getContext, saveContext } = useContextHook();

  useEffect(() => {
    getContext(setContext, context || "work");
  }, [getContext, context]);

  const handleContextChange = (context: Context) => {
    saveContext(context);
    setContext(context);
  };

  return (
    <AppContext.Provider
      value={{
        context,
        setContext: handleContextChange,
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
