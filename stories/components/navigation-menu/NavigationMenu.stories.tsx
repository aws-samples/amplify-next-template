import type { Meta, StoryObj } from "@storybook/react";
import { AppContextProvider } from "@/contexts/AppContext";
import NavigationMenu from "@/components/navigation-menu/NavigationMenu";
import { contextLocalStorage } from "./helpers";

const meta: Meta<typeof NavigationMenu> = {
  component: NavigationMenu,
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
