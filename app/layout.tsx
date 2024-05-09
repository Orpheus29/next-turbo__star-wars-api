import type { Metadata } from "next";
import { ViewTransitions } from 'next-view-transitions';
import StarJedi from "next/font/local";

import { Footer, Header } from '@/components';

import "./globals.css";

const starJedi = StarJedi(
  {
    src: [
      { path: './fonts/Starjhol.ttf', weight: '100', },
      { path: './fonts/StarJedi.ttf', weight: '400', },
      { path: './fonts/StarJediSpecialEdition.ttf', weight: '500', },
      { path: './fonts/Starjout.ttf', weight: '700' },
      { path: './fonts/Strjmono.ttf', weight: '800', },
    ],
  }
);

export const metadata: Metadata = {
  title: "Star Wars Ship Tracker",
  description: "Discover the spaceships your favorite heroes fly on",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${starJedi.className} min-h-screen font-normal`}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
