"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    key: "languages",
    skills: [
      { name: "Go", slug: "go", color: "#00ADD8" },
      { name: "Python", slug: "python", color: "#3776AB" },
      { name: "TypeScript", slug: "typescript", color: "#3178C6" },
      { name: "JavaScript", slug: "javascript", color: "#F7DF1E" },
      { name: "C++", slug: "cplusplus", color: "#00599C" },
    ]
  },
  {
    key: "frontend",
    skills: [
      { name: "React", slug: "react", color: "#61DAFB" },
      { name: "Next.js", slug: "nextdotjs", color: "#fff" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
      { name: "Shadcn UI", slug: "shadcnui", color: "#fff" },
      { name: "Framer Motion", slug: "framer", color: "#0055FF" },
    ]
  },
  {
    key: "backend",
    skills: [
      { name: "FastAPI", slug: "fastapi", color: "#009688" },
      { name: "Node.js", slug: "nodedotjs", color: "#339933" },
      { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
      { name: "MongoDB", slug: "mongodb", color: "#47A248" },
      { name: "Redis", slug: "redis", color: "#DC382D" },
      { name: "FireBase", slug: "firebase", color: "#DD2C00" },
    ]
  },
  {
    key: "infra",
    skills: [
      { name: "Docker", slug: "docker", color: "#2496ED" },
      { name: "Google Cloud", slug: "googlecloud", color: "#4285F4" },
      { name: "Vercel", slug: "vercel", color: "#fff" },
      { name: "Git", slug: "git", color: "#F05032" },
      { name: "GitHub", slug: "github", color: "#fff" },
      { name: "Linux", slug: "linux", color: "#FCC624" },
      { name: "Nginx", slug: "nginx", color: "#009639" },
    ]
  },
  {
    key: "ai",
    skills: [
      { name: "Hugging Face", slug: "huggingface", color: "#FFD21E" },
      { name: "PyTorch", slug: "pytorch", color: "#EE4C2C" },
      { name: "Pandas", slug: "pandas", color: "#150458" },
    ]
  }
];

const marqueeSkills = categories.flatMap(c => c.skills);

const categoryNames: Record<string, string> = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend & DB",
  infra: "Infra & Tools",
  ai: "AI & ML",
};

export function TechStack() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContentHeight(entry.contentRect.height);
        }
      });
      resizeObserver.observe(contentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300"
        >
          {isExpanded ? "Show less" : "View full stack"}
        </button>
      </div>

      <div className="relative">
        <motion.div
          animate={{ height: contentHeight }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div ref={contentRef}>
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <motion.div
                  key="marquee"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                >
                  <div className="flex w-max animate-infinite-scroll">
                    <div className="flex gap-12 py-4 pe-12">
                      {marqueeSkills.map((tech, index) => (
                        <div key={index} className="flex flex-col items-center justify-center gap-2">
                          <div className="h-10 w-10 transition-all duration-300">
                            <img
                              src={`https://cdn.simpleicons.org/${tech.slug}`}
                              alt={tech.name}
                              className="h-full w-full object-contain opacity-80 hover:opacity-100 transition-all duration-300 brightness-0 hover:brightness-100 dark:brightness-0 dark:invert dark:hover:invert-0 dark:hover:brightness-100"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-12 py-4 pe-12">
                      {marqueeSkills.map((tech, index) => (
                        <div key={index + marqueeSkills.length} className="flex flex-col items-center justify-center gap-2">
                          <div className="h-10 w-10 transition-all duration-300">
                            <img
                              src={`https://cdn.simpleicons.org/${tech.slug}`}
                              alt={tech.name}
                              className="h-full w-full object-contain opacity-80 hover:opacity-100 transition-all duration-300 brightness-0 hover:brightness-100 dark:brightness-0 dark:invert dark:hover:invert-0 dark:hover:brightness-100"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pt-4"
                >
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                      <div key={category.key} className="space-y-4">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-zinc-800 pb-2">
                          {categoryNames[category.key]}
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                          {category.skills.map((skill) => (
                            <div
                              key={skill.name}
                              className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-gray-100 dark:hover:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50"
                            >
                              <div className="h-5 w-5 shrink-0 transition-all duration-300">
                                <img
                                  src={`https://cdn.simpleicons.org/${skill.slug}`}
                                  alt={skill.name}
                                  className="h-full w-full object-contain opacity-50 group-hover:opacity-100 transition-all duration-300 brightness-0 group-hover:brightness-100 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100"
                                  loading="lazy"
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                                {skill.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
