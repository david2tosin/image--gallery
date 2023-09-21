import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Providers from "./components/Providers";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Gallery",
  description: "Drag and drop Image Gallery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            <Navbar />
            <main className={`${inter.className}max-w-6xl mx-auto`}>
              {children}
            </main>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
