import ConfigureAmplifyClientSide from '@/ConfigureAmplifyClientSide';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="container py-6">
        <>
          <ConfigureAmplifyClientSide />
          {children}
        </>
      </body>
    </html>
  );
}
