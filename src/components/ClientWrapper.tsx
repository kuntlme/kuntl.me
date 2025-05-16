'use client';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  if(!theme){
    setTheme("dark");
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}
