"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoLoader from "./LogoLoader";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();

  // Handle initial page load
  useEffect(() => {
    if (isInitialLoad) {
      // Safety fallback: Force stop loading after 3 seconds if animation somehow fails
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  // Handle route changes (disabled - only show on initial load)
  // Uncomment below to show loader on every route change
  // useEffect(() => {
  //   if (!isInitialLoad) {
  //     setIsLoading(true);
  //     const timer = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [pathname, isInitialLoad]);

  return (
    <>
      {isLoading && <LogoLoader onComplete={() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }} />}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        {children}
      </div>
    </>
  );
}
