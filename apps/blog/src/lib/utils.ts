import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDate(date: string): string {
  return new Date(date).toDateString()
}