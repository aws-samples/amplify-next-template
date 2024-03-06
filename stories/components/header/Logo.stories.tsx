import type { Meta, StoryObj } from "@storybook/react";
import Logo from "@/components/header/Logo";

const meta: Meta<typeof Logo> = {
  title: "Components/Header/Logo",
  component: Logo,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LogoFamily: Story = {
  args: {
    context: "family",
  },
};

export const LogoWork: Story = {
  args: {
    context: "work",
  },
};

export const LogoHobby: Story = {
  args: {
    context: "hobby",
  },
};
