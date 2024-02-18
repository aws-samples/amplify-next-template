import ConfigureAmplifyClientSide from "@/app/components/configure-amplify";
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
        <ConfigureAmplifyClientSide />
        {children}</body>
    </html>
  )
}
