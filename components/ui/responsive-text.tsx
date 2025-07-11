import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveTextProps {
  children: React.ReactNode
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "small"
  className?: string
  truncate?: boolean
  maxLines?: number
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant = "body",
  className,
  truncate = false,
  maxLines,
}) => {
  const baseClasses = {
    h1: "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold",
    h2: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold",
    h3: "text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold",
    h4: "text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold",
    body: "text-sm sm:text-base lg:text-lg",
    small: "text-xs sm:text-sm lg:text-base",
  }

  const truncateClasses = truncate ? "truncate" : ""
  const lineClampClasses = maxLines ? `line-clamp-${maxLines}` : ""

  return (
    <div className={cn(baseClasses[variant], truncateClasses, lineClampClasses, "break-words", className)}>
      {children}
    </div>
  )
}

export default ResponsiveText
