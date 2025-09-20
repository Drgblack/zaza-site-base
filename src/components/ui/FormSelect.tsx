"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type Opt = { value: string; label: string };

export function FormSelect({
  label, value, onChange, options, placeholder, className, id,
}: {
  label: string; 
  value?: string; 
  onChange: (v: string) => void;
  options: Opt[]; 
  placeholder?: string; 
  className?: string;
  id?: string;
}) {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label 
        htmlFor={selectId}
        className="text-xs font-medium text-slate-300"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 appearance-none bg-background text-foreground border border-input hover:border-ring rounded-md px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-ring text-sm cursor-pointer"
          aria-label={label}
        >
          {placeholder && !value && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(o => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
      </div>
    </div>
  );
}