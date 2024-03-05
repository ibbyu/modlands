import "@/styles/globals.css";

import { Inter } from "next/font/google";
import Providers from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "modlands",
  description: "A platform for creating and discovering mods for Borderlands",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
