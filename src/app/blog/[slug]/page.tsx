import { getPost } from '@/lib/posts'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import MDXContent from '@/components/MDXContent'
import { SiteFooter } from '@/components/SiteFooter'
import { profile } from '@/data/profile'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const dateFormatter = new Intl.DateTimeFormat('en')
  const resolvedSlug = decodeURIComponent(slug)
  const post = await getPost(resolvedSlug)

  if (!post) {
    notFound()
  }

  if (post.slug && post.slug !== resolvedSlug) {
    redirect(`/blog/${encodeURIComponent(post.slug)}`)
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black">
      <article className="flex-1 max-w-2xl -mt-2">
        <div className="mb-8">
          <p className="mb-4 font-mono text-sm font-normal text-gray-500 dark:text-gray-400">
            {post.category === 'technical' ? 'Technical' : 'General'} {'\u2022'} {dateFormatter.format(new Date(post.publishedAt))}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-8">
            {post.title}
          </h1>

          {post.imageUrl && (
            <div className="relative w-full aspect-video rounded-md overflow-hidden mb-12 border border-gray-200 dark:border-gray-800">
              <Image src={post.imageUrl} alt={post.title} fill unoptimized className="object-cover" />
            </div>
          )}

          {post.content && (
            <div className="max-w-none">
              <MDXContent serialized={post.content} />
            </div>
          )}
        </div>
      </article>

      <SiteFooter name={profile.name} email={profile.email} githubUrl={profile.githubUrl} linkedinUrl={profile.linkedinUrl} />
    </main>
  )
}
