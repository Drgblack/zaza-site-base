import MdxProvider from './mdx/MdxProvider'
import PostFooterCTA from './PostFooterCTA'

export default function PostLayout({ children }:{children:React.ReactNode}) {
  return (
    <article className="mx-auto max-w-measure prose-blog">
      <MdxProvider>{children}</MdxProvider>
      <PostFooterCTA />
    </article>
  )
}