import type { Meta, StoryObj } from "@storybook/react";
import Header from "@/components/header/Header";
import { useEffect, useState } from "react";
import { within, userEvent } from "@storybook/test";
import { NavMenuContextProvider } from "@/contexts/NavMenuContext";
import { AppContextProvider } from "@/contexts/AppContext";
import { contextLocalStorage } from "../navigation-menu/helpers";

const handleResize = (setter: (val: number) => void) => () =>
  setter(window.innerWidth);

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      const [width, setWidth] = useState(window.innerWidth);
      useEffect(() => {
        window.addEventListener("resize", handleResize(setWidth));
        return () =>
          window.removeEventListener("resize", handleResize(setWidth));
      }, []);

      return (
        <AppContextProvider
          useContextHook={() => {
            contextLocalStorage.saveContext(context.args.context || "work");
            return contextLocalStorage;
          }}
        >
          <NavMenuContextProvider>
            <Story />
            <div style={{ paddingTop: "6rem" }}>
              Width: {width} ({Math.round(width / 16)}em)
            </div>
          </NavMenuContextProvider>
        </AppContextProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
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

export const LogoOnlyContextFamily: Story = {
  args: { logoOnly: true, context: "family" },
};

export const MenuInteractionContextWork: Story = {
  args: { context: "work" },
};

MenuInteractionContextWork.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const logo = await canvas.getByText("work");
  await userEvent.click(logo);
};
