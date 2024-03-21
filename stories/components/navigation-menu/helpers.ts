import { contexts } from "@/components/navigation-menu/ContextSwitcher";
import { Context, SetContextStateFn } from "@/contexts/ContextContext";

const CONTEXT_LOCAL_STORAGE_NAME = "currentContext";

export const contextLocalStorage = {
  getContext: (setContext: SetContextStateFn, fallBackContext: Context) => {
    const result: string =
      window.localStorage.getItem(CONTEXT_LOCAL_STORAGE_NAME) ||
      fallBackContext;
    if (contexts.findIndex((c) => c === result) < 0) return;
    setContext(result as Context);
  },
  saveContext: (context: Context) => {
    window.localStorage.setItem(CONTEXT_LOCAL_STORAGE_NAME, context);
  },
};
