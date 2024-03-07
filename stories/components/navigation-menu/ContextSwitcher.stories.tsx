import type { Meta, StoryObj } from "@storybook/react";
import {
  AppContextProvider,
  Context,
  SetContextStateFn,
} from "@/contexts/AppContext";
import ContextSwitcher, {
  contexts,
} from "@/components/navigation-menu/ContextSwitcher";

const meta: Meta<typeof ContextSwitcher> = {
  component: ContextSwitcher,
  tags: ["autodocs"],
};

export default meta;

const CONTEXT_LOCAL_STORAGE_NAME = "currentContext";
type Story = StoryObj<typeof meta>;
const contextLocalStorage = {
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

const Wrapper = () => (
  <AppContextProvider useContextHook={() => contextLocalStorage}>
    <ContextSwitcher />
  </AppContextProvider>
);

export const Default: Story = {
  render: () => <Wrapper />,
};
