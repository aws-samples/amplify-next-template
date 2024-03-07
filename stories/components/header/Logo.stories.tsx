import type { Meta, StoryObj } from "@storybook/react";
import Logo from "@/components/header/Logo";

const meta: Meta<typeof Logo> = {
  component: Logo,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ContextFamily: Story = {
  args: {
    context: "family",
  },
};

export const ContextWork: Story = {
  args: {
    context: "work",
  },
};

export const ContextHobby: Story = {
  args: {
    context: "hobby",
  },
};

export const LogoOnlyContextFamily: Story = {
  args: { context: "family", logoOnly: true },
};
