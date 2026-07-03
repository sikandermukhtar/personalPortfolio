"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

interface ContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

interface TooltipData {
    count: number;
    date: string;
    x: number;
    y: number;
}

export function GithubGraph() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [tooltip, setTooltip] = useState<TooltipData | null>(null);
    const [data, setData] = useState<ContributionDay[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const id = window.setTimeout(() => setMounted(true), 0);

        fetch(`https://github-contributions-api.jogruber.de/v4/sikandermukhtar`)
            .then(res => res.json())
            .then(json => {
                if (json.contributions) {
                    setData(json.contributions);
                }
            })
            .catch(console.error);

        return () => window.clearTimeout(id);
    }, []);

    useEffect(() => {
        if (!mounted || data.length === 0) return;

        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const dateEl = target.closest("[data-date]") as HTMLElement;
            
            if (dateEl) {
                const date = dateEl.getAttribute("data-date");
                const rect = dateEl.getBoundingClientRect();
                
                if (date) {
                    const contribution = data.find(d => d.date === date);
                    setTooltip({
                        count: contribution?.count || 0,
                        date,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 8,
                    });
                }
            } else {
                setTooltip(null);
            }
        };

        const handleMouseLeave = () => {
            setTooltip(null);
        };

        const wrapper = wrapperRef.current;
        if (wrapper) {
            wrapper.addEventListener("mousemove", handleMouseMove);
            wrapper.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (wrapper) {
                wrapper.removeEventListener("mousemove", handleMouseMove);
                wrapper.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [mounted, data]);

    if (!mounted) return null;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr + "T00:00:00");
        return date.toLocaleDateString('en', {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatCount = (count: number) => {
        if (count === 0) return "No contributions";
        if (count === 1) return "1 contribution";
        return `${count} contributions`;
    };

    const getColor = (level: number) => {
        const colors = {
            light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
            dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]
        };
        const palette = theme === "dark" ? colors.dark : colors.light;
        return palette[level] || palette[0];
    };

    const weeks = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 365);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 7)) {
        const week = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(d);
            date.setDate(date.getDate() + i);
            if (date <= today) {
                const dateStr = date.toISOString().split("T")[0];
                const contribution = data.find(c => c.date === dateStr);
                week.push({
                    date: dateStr,
                    count: contribution?.count || 0,
                    level: contribution?.level || 0
                });
            } else {
                week.push(null);
            }
        }
        weeks.push(week);
    }

    return (
        <div ref={wrapperRef} className="github-graph-wrapper pb-4">
            <div ref={scrollRef} className="github-scroll-container overflow-x-auto">
                <div className="flex w-full justify-center text-xs">
                    <div className="github-contribution-grid shrink-0 md:shrink">
                        {weeks.map((week, wi) => (
                            <div key={wi} className="github-contribution-week flex flex-col">
                                {week.map((day, di) => (
                                    day ? (
                                        <div
                                            key={day.date}
                                            data-date={day.date}
                                            data-level={day.level}
                                            className="github-contribution-day rounded-sm cursor-pointer transition-shadow duration-150 hover:ring-1 hover:ring-gray-400 dark:hover:ring-gray-600"
                                            style={{ backgroundColor: getColor(day.level) }}
                                        />
                                    ) : (
                                        <div key={di} className="github-contribution-day" />
                                    )
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {tooltip && createPortal(
                <div
                    className="github-tooltip pointer-events-none"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: "translate(-50%, -100%)",
                    }}
                >
                    <span className="font-medium">{formatCount(tooltip.count)}</span>
                    <span className="opacity-60 ms-1">{formatDate(tooltip.date)}</span>
                </div>,
                document.body
            )}
        </div>
    );
}
