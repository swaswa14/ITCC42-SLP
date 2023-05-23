import SiteHeader from "./components/site-header";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SD ISE AND CENTERS",
  description: "External Projects accessed in SY 2017-2021",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <SiteHeader />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
