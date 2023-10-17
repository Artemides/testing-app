import "./globals.css";
import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Multi App",
  description: "apps under testing",
};

if (process.env.NODE_ENV === "development") {
  require("../../mocks");
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={titillium.className}>{children}</body>
    </html>
  );
}
