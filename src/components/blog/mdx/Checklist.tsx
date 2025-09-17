export default function Checklist({ items }:{ items:string[] }) {
  return (
    <ul className="my-6 space-y-2">
      {items.map((t,i)=>(
        <li key={i} className="flex gap-3">
          <span className="mt-1 h-4 w-4 rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30 grid place-items-center">
            <svg viewBox="0 0 20 20" className="h-3 w-3 fill-emerald-600"><path d="M8 13l-3-3 1.4-1.4L8 10.2l5.6-5.6L15 6z"/></svg>
          </span>
          <span className="text-[15px] leading-6">{t}</span>
        </li>
      ))}
    </ul>
  )
}