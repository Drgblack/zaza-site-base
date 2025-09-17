export default function PullQuote({ children }:{children:React.ReactNode}) {
  return (
    <blockquote className="my-8 border-l-4 pl-4 italic text-lg leading-8 border-brand-400">
      {children}
    </blockquote>
  )
}