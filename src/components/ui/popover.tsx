"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Simple dropdown implementation without external dependencies
const Popover = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>
}

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, children, asChild, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...children.props,
      onClick: () => setIsOpen(!isOpen),
      ref
    })
  }
  
  return (
    <button
      ref={ref}
      className={className}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
    </button>
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    side?: "top" | "right" | "bottom" | "left"
    align?: "start" | "center" | "end"
    sideOffset?: number
  }
>(({ className, side = "bottom", align = "center", sideOffset = 4, children, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false)
  
  React.useEffect(() => {
    setIsVisible(true)
  }, [])
  
  if (!isVisible) return null
  
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-[100] w-72 rounded-md border bg-white p-4 text-slate-900 shadow-2xl outline-none",
        side === "bottom" && "top-full mt-2",
        side === "top" && "bottom-full mb-2", 
        side === "left" && "right-full mr-2",
        side === "right" && "left-full ml-2",
        align === "start" && "left-0",
        align === "center" && "left-1/2 -translate-x-1/2",
        align === "end" && "right-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }