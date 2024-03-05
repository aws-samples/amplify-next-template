import type { Meta, StoryObj } from "@storybook/react";
import SearchBar from "@/components/header/SearchBar";
import { FC } from "react";
import { Context } from "@/components/navigation-menu/AppContext";

const meta: Meta<typeof SearchBar> = {
  title: "Components/Header/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
};

export default meta;

const SearchBarWithBorder: FC<{ context?: Context }> = (props) => {
  return <SearchBar context={props.context} alwaysBorder />;
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ContextWork: Story = {
  render: () => <SearchBarWithBorder context="work" />,
};
export const ContextFamily: Story = {
  render: () => <SearchBarWithBorder context="family" />,
};
export const ContextHobby: Story = {
  render: () => <SearchBarWithBorder context="hobby" />,
};
