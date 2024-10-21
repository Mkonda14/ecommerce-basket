import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateFormat(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full"
  }).format(new Date(date))
}
