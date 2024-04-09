import { FC, ReactNode, createContext, useContext, useState } from "react";

interface NavMenuContextType {
  menuIsOpen: boolean;
  toggleMenu: () => void;
}

interface NavMenuContextProviderProps {
  children: ReactNode;
}

const NavMenuContext = createContext<NavMenuContextType | undefined>(undefined);

export const NavMenuContextProvider: FC<NavMenuContextProviderProps> = ({
  children,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <NavMenuContext.Provider value={{ menuIsOpen, toggleMenu }}>
      {children}
    </NavMenuContext.Provider>
  );
};

export const useNavMenuContext = () => {
  const navMenu = useContext(NavMenuContext);
  if (navMenu === undefined) {
    throw new Error(
      "useNavMenuContext must be used within an NavMenuContextProvider"
    );
  }
  return navMenu;
};
