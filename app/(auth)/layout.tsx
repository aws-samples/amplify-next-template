import { Menu, MenuItem, View } from '@aws-amplify/ui-react';
import ConfigureAmplifyClientSide from "@/components/ConfigureAmplify";
export const metadata = {
  title: '2One.tech',
  description: 'Signup for 2One.tech',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ConfigureAmplifyClientSide />
        <h1>Test 1</h1>
        {children}</body>
    </html>
  )
}
