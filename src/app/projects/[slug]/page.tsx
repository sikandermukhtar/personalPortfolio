import { getProject } from '@/lib/projects'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import MDXContent from '@/components/MDXContent'
import { SiteFooter } from '@/components/SiteFooter'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { profile } from '@/data/profile'
import { ExternalLink, Github } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params
  const resolvedSlug = decodeURIComponent(slug)
  const project = await getProject(resolvedSlug)

  if (!project) {
    notFound()
  }

  if (project.slug && project.slug !== resolvedSlug) {
    redirect(`/projects/${encodeURIComponent(project.slug)}`)
  }

  const detailSections = [
    project.features ? { title: 'Features', items: project.features } : null,
    ...(project.detailSections ?? []),
    project.challenges ? { title: 'Challenges', items: project.challenges } : null,
    project.lessons ? { title: 'Lessons Learned', items: project.lessons } : null,
  ].filter((section): section is { title: string; items: string[]; imageUrl?: string } => Boolean(section?.items.length))

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black">
      <article className="flex-1">
        <div className="mb-8">
          <h1 className="mb-4 max-w-2xl font-sans text-2xl font-semibold leading-[1.15] tracking-tight text-balance md:text-3xl lg:text-[2.15rem]">
            {project.title}
          </h1>

          <p className="mb-5 max-w-2xl text-sm leading-6 text-gray-600 text-pretty dark:text-gray-400">
            {project.description}
          </p>

          <div className="mb-8 flex flex-wrap gap-3">
            {project.projectUrl && (
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-[scale,background-color] duration-150 ease-out hover:bg-gray-800 active:scale-[0.96] dark:bg-white dark:text-black dark:hover:bg-gray-200">
                {project.projectUrlLabel || "Live Demo"}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {project.githubUrls && project.githubUrls.length > 0 ? (
              project.githubUrls.map((git) => (
                <HoverBorderGradient
                  key={git.url}
                  as="a"
                  href={git.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  containerClassName="rounded-full"
                  className="inline-flex min-h-10 items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
                  duration={1.5}
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>{git.label}</span>
                </HoverBorderGradient>
              ))
            ) : (
              project.githubUrl && (
                <HoverBorderGradient
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  containerClassName="rounded-full"
                  className="inline-flex min-h-10 items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
                  duration={1.5}
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>View Source</span>
                </HoverBorderGradient>
              )
            )}
          </div>

          {project.imageUrl && (
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900">
              <Image src={project.imageUrl} alt={project.title} fill unoptimized className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10" />
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-200 pb-6 dark:border-gray-800">
              {project.technologies.map((tech: string) => (
                <span key={tech} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {project.content && (
            <div className="mb-10">
              <MDXContent serialized={project.content} variant="compact" />
            </div>
          )}

          {detailSections.map((section) => (
            <section key={section.title} className="mb-8 border-t border-gray-200 pt-6 dark:border-gray-800">
              <h2 className="mb-4 font-sans text-lg font-semibold tracking-tight text-balance md:text-xl">{section.title}</h2>
              <ul className="list-disc space-y-1.5 ps-5 text-sm leading-6 text-gray-700 dark:text-gray-300">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {section.imageUrl && (
                <Image
                  src={section.imageUrl}
                  alt={section.title}
                  width={1200}
                  height={800}
                  unoptimized
                  className="mt-5 h-auto w-full rounded-md bg-gray-100 object-contain outline outline-1 -outline-offset-1 outline-black/10 dark:bg-gray-900 dark:outline-white/10"
                />
              )}
            </section>
          ))}
        </div>
      </article>

      <SiteFooter name={profile.name} email={profile.email} githubUrl={profile.githubUrl} linkedinUrl={profile.linkedinUrl} />
    </main>
  )
}
