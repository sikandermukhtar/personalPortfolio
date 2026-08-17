"use client"

import { quotes } from '@/data/quotes'
import { profile } from '@/data/profile'
import { SiteFooter } from '@/components/SiteFooter'
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'

export default function QuotesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black">
      {/* Intro Header */}
      <ScrollAnimation delay={0} animation="fade-up">
        <section className="mb-12 flex flex-col justify-center mt-2">
          <div className="max-w-xl">
            <h1 className="font-serif text-[2.15rem] font-medium leading-[1.1] tracking-tight mb-2 text-balance md:text-[2.6rem] lg:text-[3rem]">
              Quotes
            </h1>
          </div>
        </section>
      </ScrollAnimation>

      {/* List of Quotes */}
      <ScrollAnimation delay={0.1} animation="fade-up">
        <StaggerContainer className="flex flex-col gap-6 mb-16 max-w-2xl mx-auto w-full">
          {quotes.map((quote, idx) => (
            <StaggerItem key={quote.id} index={idx}>
              <div className="border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/10 p-8 rounded-2xl relative overflow-hidden flex flex-col items-center text-center w-full shadow-sm hover:shadow-md hover:border-black dark:hover:border-white transition-all duration-300">
                <p className="font-serif text-lg md:text-xl leading-relaxed text-black dark:text-white font-medium max-w-xl italic">
                  {idx + 1}. "{quote.text}"
                </p>
                <cite className="not-italic font-sans text-sm font-semibold text-black dark:text-white mt-6 block">
                  ~ {quote.author}
                </cite>
                {quote.role && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                    {quote.role}
                  </span>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollAnimation>

      <ScrollAnimation delay={0}>
        <SiteFooter name={profile.name} email={profile.email} githubUrl={profile.githubUrl} linkedinUrl={profile.linkedinUrl} />
      </ScrollAnimation>
    </main>
  )
}
