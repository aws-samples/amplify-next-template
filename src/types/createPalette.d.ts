// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    paper: string;
    default: string;
    level2: string;
    level1: string;
    footer: string;
  }

  interface PaletteOptions {
    cardShadow?: string;
    alternate: {
      main: string;
      dark: string;
    };
  }

  interface Palette {
    cardShadow?: string;
    alternate: {
      main: string;
      dark: string;
    };
  }
}
