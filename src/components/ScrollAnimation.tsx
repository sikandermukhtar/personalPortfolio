"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimationProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    animation?: "fade-up" | "fade-in" | "scale-in";
}

const animations = {
    "fade-up": {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
    },
    "fade-in": {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
    },
    "scale-in": {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
    },
};

export function ScrollAnimation({
    children,
    delay = 0,
    className = "",
    animation = "fade-up",
}: ScrollAnimationProps) {
    const variant = animations[animation];

    return (
        <motion.div
            initial={variant.initial}
            whileInView={variant.whileInView}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.1 }: StaggerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerItemProps {
    children: ReactNode;
    index: number;
    staggerDelay?: number;
}

export function StaggerItem({ children, index, staggerDelay = 0.1 }: StaggerItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.4,
                delay: index * staggerDelay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}