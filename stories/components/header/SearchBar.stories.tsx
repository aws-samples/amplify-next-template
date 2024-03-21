import type { Meta, StoryObj } from "@storybook/react";
import SearchBar from "@/components/header/SearchBar";
import { FC } from "react";
import { Context } from "@/contexts/ContextContext";

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ContextWork: Story = {
  args: { context: "work", alwaysBorder: true },
};
export const ContextFamily: Story = {
  args: { context: "family", alwaysBorder: true },
};
export const ContextHobby: Story = {
  args: { context: "hobby", alwaysBorder: true },
};
