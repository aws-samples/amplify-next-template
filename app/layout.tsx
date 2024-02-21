import ConfigureAmplifyClientSide from "@/app/components/configure-amplify";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/styles/theme';
import ButtonAppBar from "./components/navigation";

export const metadata = {
  title: '2One.tech',
  description: 'Artificial Intelligence Services for SMEs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ButtonAppBar/>
        <ConfigureAmplifyClientSide />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
