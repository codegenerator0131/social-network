import React from "react";
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "GitConnect",
  description: "A social network for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
