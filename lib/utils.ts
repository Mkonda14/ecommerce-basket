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

export function milleToK(nbre: number): string {
  if (nbre > 1000){
    if(nbre >= 1100) return (nbre / 1000).toFixed(1) + "k";
    return (nbre / 1000).toFixed(0) + "k";
  }
  return nbre.toString();
}
