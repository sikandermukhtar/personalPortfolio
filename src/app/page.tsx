import { profile as FALLBACK_PROFILE } from '@/data/profile'
import { getProjects } from '@/lib/projects'
import { GithubGraph } from '@/components/GithubGraph'
import { TechStack } from '@/components/TechStack'
import { ExperienceItem } from '@/components/ExperienceItem'
import { ProjectsList } from '@/components/ProjectsList'
import { ContactForm } from '@/components/ContactForm'
import { SiteFooter } from '@/components/SiteFooter'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { Download } from 'lucide-react'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'

export default async function Home() {
  const profile = FALLBACK_PROFILE
  const projects = await getProjects()

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black">
      <ScrollAnimation delay={0} animation="fade-up">
        <section className="mb-24 flex flex-col justify-center mt-2">
          <div className="max-w-xl">
            <p className="mb-4 font-mono text-sm text-gray-500 dark:text-gray-400 md:text-base">
              Full-Stack &amp; Machine Learning Engineer
            </p>
            <h1 className="font-serif text-[2.15rem] font-medium leading-[1.1] tracking-tight mb-6 text-balance md:text-[2.6rem] lg:text-[3rem]">
              Building intelligent systems for language, automation, and the web.
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-6 text-pretty max-w-lg">
              I work across machine learning, backend systems, and frontend development to build practical AI-powered software with clean architecture and thoughtful user experiences.
            </p>
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation delay={0.1} animation="fade-up">
        <section className="mb-16 pt-8 pb-12">
          <h2 className="font-serif text-2xl md:text-3xl mb-8 tracking-tight">GitHub Contributions</h2>
          <GithubGraph />
        </section>
      </ScrollAnimation>

      <ScrollAnimation delay={0.1} animation="fade-up">
        <section className="mb-10 py-6">
          <h2 className="font-serif text-2xl md:text-3xl mb-6 tracking-tight">Tech Stack</h2>
          <TechStack />
        </section>
      </ScrollAnimation>

      <ScrollAnimation delay={0.1} animation="fade-up">
        <section id="experience" className="mb-16 py-12">
          <h2 className="font-serif text-2xl md:text-3xl mb-12 tracking-tight">Experience</h2>
          <div className="space-y-12">
            <ExperienceItem
              title="Digimark Developers"
              role="AI/ML Engineer — Lahore, Pakistan (Jul 2025 – Apr 2026)"
              collapsible={true}
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Started as an AI/ML Intern and transitioned into an Associate AI/ML Engineer role, focusing on retrieval-augmented generation (RAG) pipelines, workflow automation, FastAPI backend development, and predictive modeling.
              </p>
              
              <dl className="space-y-6">
                <div>
                  <dt className="font-semibold text-black dark:text-white text-sm mb-1">
                    Associate AI/ML Engineer <span className="text-xs text-gray-400 dark:text-gray-500 font-mono font-normal ml-1">(Dec 2025 – Apr 2026)</span>
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400 text-sm pl-4 border-l border-gray-200 dark:border-gray-800">
                    <ul className="list-disc space-y-2 pl-4">
                      <li>
                        Architected Retrieval-Augmented Generation (RAG) pipelines and integrated observability frameworks to monitor LLM performance, track token usage, and reduce response latency.
                      </li>
                      <li>
                        Designed and deployed N8N automation workflows and voice agents using VAPI, connecting third-party APIs to streamline business processes, automate customer calls, and eliminate operational bottlenecks.
                      </li>
                      <li>
                        Implemented Twilio and VAPI SDKs with FastAPI for integrated communication solutions.
                      </li>
                    </ul>
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-black dark:text-white text-sm mb-1">
                    AI/ML Intern <span className="text-xs text-gray-400 dark:text-gray-500 font-mono font-normal ml-1">(Jul 2025 – Dec 2025)</span>
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400 text-sm pl-4 border-l border-gray-200 dark:border-gray-800">
                    <ul className="list-disc space-y-2 pl-4">
                      <li>
                        Collaborated with clients to engineer effective workflows, ensuring alignment with project goals.
                      </li>
                      <li>
                        Trained and evaluated classification models for sentiment analysis and computer vision tasks, enhancing predictive accuracy.
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {["FastAPI", "RAG", "N8N", "LangChain", "LangSmith", "VAPI", "Twilio", "Machine Learning", "Deep Learning", "Agentic AI"].map((tech) => (
                  <HoverBorderGradient
                    key={tech}
                    as="span"
                    containerClassName="rounded-full"
                    className="px-2 py-0.5 text-[10px] font-mono"
                    duration={1.5}
                  >
                    {tech}
                  </HoverBorderGradient>
                ))}
              </div>
            </ExperienceItem>
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation delay={0.1} animation="fade-up">
        <section id="projects" className="mb-10 py-8">
          <h2 className="font-serif text-2xl md:text-3xl mb-6 tracking-tight">Projects</h2>
          <ProjectsList projects={projects} />
        </section>
      </ScrollAnimation>

      <ScrollAnimation delay={0} animation="fade-up">
        <section id="resume" className="py-14 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col items-start gap-5">
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight">Resume</h2>
            <a
              href="/resume.pdf"
              download
              className="inline-flex min-h-10 items-center justify-center gap-2 border-b border-black pb-0.5 font-mono text-sm text-black transition-colors hover:text-gray-500 active:scale-[0.96] dark:border-white dark:text-white dark:hover:text-gray-400"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation delay={0} animation="fade-up">
        <section id="contact" className="py-14 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-xl">
            <h2 className="font-serif text-2xl md:text-3xl mb-4 tracking-tight">Contact</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 font-mono text-sm leading-relaxed">
              Get in touch
            </p>

            <ContactForm />
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation delay={0} animation="fade-up">
        <SiteFooter name={profile.name} email={profile.email} githubUrl={profile.githubUrl} linkedinUrl={profile.linkedinUrl} />
      </ScrollAnimation>
    </main>
  )
}
