import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200",
        className
      )}
    >
      {children}
    </div>
  );
}
