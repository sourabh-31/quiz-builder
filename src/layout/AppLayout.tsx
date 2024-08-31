import Navbar from "@components/shared/Navbar";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <section className="flex h-screen flex-col overflow-y-auto bg-bg">
      {/* App Navbar */}

      <Navbar />

      {/* Main Content */}

      <main
        className={`mx-auto mb-16 w-full max-w-8xl flex-grow px-6 sm:px-12 ${className}`}
      >
        {children}
      </main>
    </section>
  );
}
