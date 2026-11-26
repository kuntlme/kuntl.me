import React from "react";
import { ClientWrapper } from "./ClientWrapper";
import { cn } from "../../lib/utils";
import ThemeProviderComponent from "@/components/ThemeProviderComponent";
import Footer from "./footer";
import { MobileNavbar, Navbar } from "./Navbar";

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientWrapper>
      <ThemeProviderComponent>
        <div
          className={cn(
            "relative bg-gray-200 dark:bg-zinc-900 flex flex-col justify-start items-center w-full min-h-screen h-fit",
          )}
        >
          <Navbar />

          {children}

          <Footer />
          <MobileNavbar />
        </div>
      </ThemeProviderComponent>
    </ClientWrapper>
  );
};

export default LayoutComponent;
