'use client'
import { AlertTriangle, Info, Sparkles, AlertOctagon } from 'lucide-react'

const styles = {
  info:    'bg-blue-50 border-blue-200 text-blue-900',
  tip:     'bg-emerald-50 border-emerald-200 text-emerald-900',
  warn:    'bg-amber-50 border-amber-200 text-amber-900',
  danger:  'bg-rose-50 border-rose-200 text-rose-900',
}
const icons = { info: Info, tip: Sparkles, warn: AlertTriangle, danger: AlertOctagon }

export default function Callout(
  { type='info', title, children }:
  { type?: 'info'|'tip'|'warn'|'danger'; title?: string; children: React.ReactNode }
){
  const Icon = icons[type]
  return (
    <aside className={`my-6 border rounded-xl p-4 ${styles[type]}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4" />
        {title && <strong className="font-semibold">{title}</strong>}
      </div>
      <div className="text-sm leading-6">{children}</div>
    </aside>
  )
}