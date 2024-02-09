'use client'; // This is a client component 👈🏽

/* eslint-disable react/display-name */
import React from 'react';

import Page from '../components/Page';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

/* eslint-disable react/prop-types */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Page>{children}</Page>
      </body>
    </html>
  );
}
