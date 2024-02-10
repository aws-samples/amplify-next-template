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
      <head></head>
      <body>
        <Page>{children}</Page>
      </body>
    </html>
  );
}
