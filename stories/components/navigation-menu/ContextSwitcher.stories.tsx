import type { Meta, StoryObj } from "@storybook/react";
import { AppContextProvider } from "@/contexts/AppContext";
import ContextSwitcher from "@/components/navigation-menu/ContextSwitcher";
import { contextLocalStorage } from "./helpers";

const meta: Meta<typeof ContextSwitcher> = {
  component: ContextSwitcher,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <AppContextProvider useContextHook={() => contextLocalStorage}>
        <Story />
      </AppContextProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
