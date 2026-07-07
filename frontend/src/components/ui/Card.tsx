import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}