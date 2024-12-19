import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'toastr/build/toastr.min.css';
import { AuthProvider } from "./context/AuthContext";



export const metadata: Metadata = {
  title: "U M S",
  description: "User Management System",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  return (
    <html lang="en" className={`${inter.variable}`} suppressContentEditableWarning>
      <body
        className={`antialiased dark:bg-background-dark dark:text-text-dark ${inter.className}`}
      >
        <AuthProvider>{children}</AuthProvider>




      </body>
    </html>
  );
}
