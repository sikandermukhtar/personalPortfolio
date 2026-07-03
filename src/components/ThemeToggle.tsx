"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const id = window.setTimeout(() => setMounted(true), 0);
        return () => window.clearTimeout(id);
    }, []);

    if (!mounted) {
        return (
            <div className="h-6 w-10 rounded-full bg-[#D5D5D5] animate-pulse sm:h-7 sm:w-12" />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="group relative flex h-6 w-10 cursor-pointer items-center rounded-full bg-[#D5D5D5] p-0.5 transition-all duration-300 ease-in-out hover:bg-[#BBBBBB] sm:h-7 sm:w-12"
            aria-label="Toggle theme"
        >
            <div
                className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-md transition-all duration-500 ease-in-out sm:h-6 sm:w-6 ${isDark ? "translate-x-4 sm:translate-x-5" : "translate-x-0"}`}
            >
                {isDark ? (
                    <Moon className="h-2.5 w-2.5 text-black" />
                ) : (
                    <Sun className="h-2.5 w-2.5 text-orange-400 fill-orange-400" />
                )}
            </div>
        </button>
    );
}
