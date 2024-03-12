import MainNavigationSection from "@/components/navigation-menu/MainNavigationSection";
import { Context } from "@/contexts/AppContext";
import { Meta, StoryObj } from "@storybook/react";
import { FC, useEffect, useState } from "react";

type WrapperType = { context?: Context };

const handleResize = (setWidth: (width: number) => void) => () => {
  setWidth(window.innerWidth);
};

const Wrapper: FC<WrapperType> = ({ context }) => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize(setWidth));
    return () => window.removeEventListener("resize", handleResize(setWidth));
  }, []);
  return (
    <div>
      <div>
        Width: {width} ({Math.round(width / 16)}em)
      </div>
      <MainNavigationSection context={context} />
    </div>
  );
};

const meta: Meta<typeof Wrapper> = {
  component: Wrapper,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ContextWork: Story = { args: { context: "work" } };
export const ContextFamily: Story = { args: { context: "family" } };
export const ContextHobby: Story = { args: { context: "hobby" } };
