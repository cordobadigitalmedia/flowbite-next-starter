import { ClerkProvider } from "@clerk/nextjs";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import { Inter } from "next/font/google";
import { type FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import "./globals.css";
import { flowbiteTheme } from "./theme";

const inter = Inter({ subsets: ["latin"] });

const RootLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <ThemeModeScript />
        </head>
        <body
          className={twMerge("bg-gray-50 dark:bg-gray-900", inter.className)}
        >
          <Flowbite theme={{ theme: flowbiteTheme }}>{children}</Flowbite>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
