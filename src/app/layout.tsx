import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TRPCReactProvider } from "@/trpc/client";
import { shadcn } from "@clerk/themes";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Roons",
    template: "%s | Roons",
  },
  description: "AI powered text-to-speech and voice cloning platform",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: shadcn,
      }}
    >
      <TRPCReactProvider>
        <html lang='en'>
          <body
            className={`${inter.variable} ${geistMono.variable} antialiased`}
          >
            <NuqsAdapter>{children}</NuqsAdapter>
            <Toaster />
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
