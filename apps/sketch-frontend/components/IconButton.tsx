import type { ReactNode } from "react"

export function IconButton({
  icon,
  onClick,
  activated,
  className
}: {
  icon: ReactNode
  onClick: () => void
  activated?: boolean 
  className? : string
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md transition-colors duration-200 ${className} ${
        activated ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {icon}
    </button>
  )
}

