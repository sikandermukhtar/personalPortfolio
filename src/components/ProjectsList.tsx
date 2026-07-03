"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 2);

  if (projects.length === 0) {
    return (
      <div className="font-mono text-sm italic text-gray-400 dark:text-gray-500">
        No projects added yet.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {displayedProjects.map((project) => (
          <Link
            key={project._id}
            href={`/projects/${project.slug}`}
            className="group block cursor-pointer"
          >
            <div className="mt-3">
              <h3 className="text-lg font-semibold tracking-tight mb-1 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {project.description}
              </p>
            </div>
            {project.technologies && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="text-xs border border-gray-200 dark:border-gray-700 rounded-full px-2.5 py-0.5 text-gray-600 dark:text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      {projects.length > 2 && (
        <div className="mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-300 transition-colors tracking-widest uppercase"
          >
            {showAll ? "Show less" : "Show all projects"}
          </button>
        </div>
      )}
    </div>
  );
}
