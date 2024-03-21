import type { Meta, StoryObj } from "@storybook/react";
import {
  ContextContextProvider,
  useContextContext,
} from "@/contexts/ContextContext";
import NavigationMenu from "@/components/navigation-menu/NavigationMenu";
import { contextLocalStorage } from "./helpers";

const meta: Meta<typeof NavigationMenu> = {
  component: NavigationMenu,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ContextContextProvider useContextHook={() => contextLocalStorage}>
        <Story />
      </ContextContextProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { context } = useContextContext();
    return <NavigationMenu context={context} />;
  },
};
export const ContextFamily: Story = { args: { context: "family" } };
export const ContextHobby: Story = { args: { context: "hobby" } };
export const ContextWork: Story = { args: { context: "work" } };
