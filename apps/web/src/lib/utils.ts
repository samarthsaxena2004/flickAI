import { clsx, type ClassValue } from 'clsx'

// Simple cn utility for merging class names
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}
