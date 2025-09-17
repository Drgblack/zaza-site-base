'use client'
import { MDXProvider } from '@mdx-js/react'
import Callout from './Callout'
import PullQuote from './PullQuote'
import Checklist from './Checklist'
import Divider from './Divider'

const base = {
  h2: (p:any)=><h2 {...p} className="mt-10 scroll-mt-24 text-2xl font-bold" />,
  h3: (p:any)=><h3 {...p} className="mt-8 scroll-mt-24 text-xl font-semibold" />,
  p:  (p:any)=><p {...p} className="my-5 leading-7" />,
  ul: (p:any)=><ul {...p} className="my-5 list-disc pl-6 space-y-2" />,
  ol: (p:any)=><ol {...p} className="my-5 list-decimal pl-6 space-y-2" />,
  blockquote: (p:any)=><blockquote {...p} className="my-6 border-l-4 pl-4 italic text-zinc-700" />,
  table: (p:any)=><div className="my-6 overflow-x-auto"><table {...p} className="min-w-full text-sm"/></div>,
}

const mdxComponents = { ...base, Callout, PullQuote, Checklist, Divider }
export default function MdxProvider({children}:{children:React.ReactNode}) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>
}