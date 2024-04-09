import ProfilePicture from "@/components/header/ProfilePicture";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProfilePicture> = {
  component: ProfilePicture,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
