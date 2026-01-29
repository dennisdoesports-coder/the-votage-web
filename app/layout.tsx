import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Agentation } from "agentation";



// Local Copperplate fonts
const copperplateBold = localFont({
  src: "../public/font/fonnts.com-Copperplate-Bol-.otf",
  variable: "--font-copperplate-bold",
});

const copperplateMedium = localFont({
  src: "../public/font/fonnts.com-Copperplate-Med-.otf",
  variable: "--font-copperplate-medium",
});

const copperplateLight = localFont({
  src: "../public/font/fonnts.com-Copperplate-Lig-.otf",
  variable: "--font-copperplate-light",
});

const copperplateCondensedMedium = localFont({
  src: "../public/font/fonnts.com-Copperplate-Con-Med-.otf",
  variable: "--font-copperplate-condensed-medium",
});

const copperplateCondensedBold = localFont({
  src: "../public/font/fonnts.com-Copperplate-Con-Bol-.otf",
  variable: "--font-copperplate-condensed-bold",
});

const copperplateCondensedLight = localFont({
  src: "../public/font/fonnts.com-Copperplate-Con-Lig-.otf",
  variable: "--font-copperplate-condensed-light",
});

export const metadata: Metadata = {
  title: "Welcome to The Votage",
  description: " We are the Voice of this age ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${copperplateBold.variable} ${copperplateMedium.variable} ${copperplateLight.variable} ${copperplateCondensedMedium.variable} ${copperplateCondensedBold.variable} ${copperplateCondensedLight.variable} antialiased`}
      >
        {process.env.NODE_ENV === "development" && <Agentation />}
        {children}
      </body>
    </html>
  );
}
