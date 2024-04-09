import type { Meta, StoryObj } from "@storybook/react";
import { MainLayoutInner as MainLayout } from "@/components/layouts/MainLayout";
import { useEffect, useState } from "react";
import { contextLocalStorage } from "../components/navigation-menu/helpers";
import {
  ContextContextProvider,
  useContextContext,
} from "@/contexts/ContextContext";
import { NavMenuContextProvider } from "@/contexts/NavMenuContext";

const addResizeListener = (setter: (val: number) => void) => {
  const handleResize = () => setter(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
};

const meta: Meta<typeof MainLayout> = {
  component: MainLayout,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NavMenuContextProvider>
        <ContextContextProvider useContextHook={() => contextLocalStorage}>
          <Story />
        </ContextContextProvider>
      </NavMenuContextProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { context } = useContextContext();
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => addResizeListener(setWidth), []);

    return (
      <MainLayout sectionName="Test" context={context}>
        Width: {width} ({Math.round(width / 16)}em)
      </MainLayout>
    );
  },
};

export const ContextFamily: Story = {
  args: { context: "family" },
};

export const ContextWork: Story = {
  args: { context: "work" },
};

export const ContextHobby: Story = {
  args: { context: "hobby" },
};

export const WithNewButton: Story = {
  args: {
    addButton: { label: "New", onClick: () => alert("Button clicked") },
    title: "Main Screen",
    children: <div>Here comes the content</div>,
  },
};
