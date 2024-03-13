import MainNavigationSection from "@/components/navigation-menu/MainNavigationSection";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MainNavigationSection> = {
  component: MainNavigationSection,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ContextWork: Story = { args: { context: "work" } };
export const ContextFamily: Story = { args: { context: "family" } };
export const ContextHobby: Story = { args: { context: "hobby" } };
