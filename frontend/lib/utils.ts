import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const dateOrNull = z
  .string()
  .refine(
    (val) => {
      if (val === "") return true;
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    { message: "Invalid date" }
  )
  .transform((val) => (val === "" ? null : new Date(val)));
