import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function copyTextToClipboard(textToCopy: string) {
    try {
        if (navigator?.clipboard?.writeText) {
            await navigator.clipboard.writeText(textToCopy);
        }
    } catch (err) {
        console.error(err);
    }
}
