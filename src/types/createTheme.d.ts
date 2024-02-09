// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Theme, ThemeOptions } from '@mui/material/styles/createTheme';

declare module '@mui/material/styles/createTheme' {
  interface Theme {
    themeToggler: () => void;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    themeToggler?: () => void;
  }
}
