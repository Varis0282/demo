import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    variant?: "default" | "outline" | "ghost" | "secondary" | "link"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        // Basic implementation without Radix Slot if not installed, but "asChild" is standard pattern.
        // I didn't install @radix-ui/react-slot. I'll remove asChild logic for simplicity or just use 'button'.

        const Comp = "button"

        // I'll assume usage of standard colors. 
        // Ideally I'd use cva (class-variance-authority) but I can just do a switch or map.

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm"

        const variants = {
            default: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200",
            outline: "border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
            secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700",
            ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50",
            link: "text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline",
        }

        const sizes = {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-12 rounded-md px-8 text-base",
            icon: "h-9 w-9",
        }

        // Resolving variant style manually since I don't have cva
        let variantStyle = variants.default;
        if (variant === 'outline') variantStyle = variants.outline;
        if (variant === 'ghost') variantStyle = variants.ghost;
        if (variant === 'link') variantStyle = variants.link;
        if (variant === 'secondary') variantStyle = variants.secondary;

        // Resolving size
        let sizeStyle = sizes.default;
        if (size === 'sm') sizeStyle = sizes.sm;
        if (size === 'lg') sizeStyle = sizes.lg;
        if (size === 'icon') sizeStyle = sizes.icon;

        return (
            <button
                className={cn(baseStyles, variantStyle, sizeStyle, className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
