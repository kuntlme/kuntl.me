import React from "react";
import { ClientWrapper } from "./ClientWrapper";
import { cn } from "../../lib/utils";
import ThemeProviderComponent from "@/components/ThemeProviderComponent";
import NavbarComponent from "./Navbar";
import FooterComponent from "./footer";

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientWrapper>
      <ThemeProviderComponent>
        <div
          className={cn(
            "bg-gray-200 dark:bg-zinc-900 flex flex-col justify-start items-center w-full min-h-screen h-fit",
          )}
        >
          <NavbarComponent />

          {children}

          <FooterComponent />
        </div>
      </ThemeProviderComponent>
    </ClientWrapper>
  );
};

export default LayoutComponent;
