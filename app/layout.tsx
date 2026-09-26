import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/context/ToastContext";
import { WorkoutsProvider } from "@/context/WorkoutsContext";
import { PlanProvider } from "@/context/PlanContext";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-text-primary">
        <ToastProvider>
          <WorkoutsProvider>
            <PlanProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </PlanProvider>
          </WorkoutsProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
