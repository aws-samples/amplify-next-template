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

interface ContextContextType {
  context?: Context;
  setContext: SetContextStateFn;
}

type ContextHookResult = {
  getContext: (setContext: SetContextStateFn, fallBackContext: Context) => void;
  saveContext: SetContextStateFn;
};

interface ContextContextProviderProps {
  children: ReactNode;
  useContextHook: () => ContextHookResult;
}

const ContextContext = createContext<ContextContextType | undefined>(undefined);

export const ContextContextProvider: FC<ContextContextProviderProps> = ({
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
    <ContextContext.Provider
      value={{
        context,
        setContext: handleContextChange,
      }}
    >
      {children}
    </ContextContext.Provider>
  );
};

export const useContextContext = () => {
  const context = useContext(ContextContext);
  if (context === undefined) {
    throw new Error(
      "useContextContext must be used within an ContextContextProvider"
    );
  }
  return context;
};
