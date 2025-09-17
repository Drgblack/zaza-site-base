import MdxProvider from './mdx/MdxProvider'
import PostFooterCTA from './PostFooterCTA'

export default function PostLayout({ children }:{children:React.ReactNode}) {
  return (
    <article className="mx-auto max-w-measure prose prose-zinc prose-headings:scroll-mt-24 prose-a:text-brand-600 dark:prose-invert">
      <MdxProvider>{children}</MdxProvider>
      <PostFooterCTA />
    </article>
  )
}