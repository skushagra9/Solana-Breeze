"use client";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function Navbar() {
  const { setTheme, theme } = useTheme();

  return (
        <div className="flex flex-row justify-end mx-auto w-full pt-2 md:pt-8 md:px-8 ">
        
            <Button
            variant="ghost"
            size="icon"
            onClick={() => {
                {
                theme == "light" ? setTheme("dark") : setTheme("light");
                }
            }}
            >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
        
        </div>
  );
}
