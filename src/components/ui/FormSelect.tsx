"use client";
import * as React from "react";
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem, SelectGroup
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Opt = { value: string; label: string };

export function FormSelect({
  label, value, onChange, options, placeholder, minWidth = 220, className,
}: {
  label: string; 
  value?: string; 
  onChange: (v: string) => void;
  options: Opt[]; 
  placeholder?: string; 
  minWidth?: number; 
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          aria-label={label}
          className="h-10 bg-background text-foreground border border-input hover:border-ring rounded-md px-3 justify-between focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <SelectValue placeholder={placeholder ?? label} />
        </SelectTrigger>
        <SelectContent
          position="popper"
          sideOffset={8}
          className="z-[9999] bg-popover text-popover-foreground border border-border shadow-xl rounded-md p-1"
          style={{ minWidth }}
        >
          <SelectGroup>
            {options.map(o => (
              <SelectItem
                key={o.value} 
                value={o.value}
                className="px-3 py-2 text-sm leading-6 rounded cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
              >
                {o.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}