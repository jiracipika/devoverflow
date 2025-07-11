import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveCardProps {
  children: React.ReactNode
  className?: string
  padding?: "sm" | "md" | "lg"
  hover?: boolean
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({ children, className, padding = "md", hover = true }) => {
  const paddingClasses = {
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-6 lg:p-8",
    lg: "p-6 sm:p-8 lg:p-10",
  }

  return (
    <div
      className={cn(
        "bg-card-gradient rounded-lg shadow-md",
        "transition-all duration-200",
        hover && "hover:shadow-lg hover:scale-[1.02]",
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  )
}

export default ResponsiveCard
