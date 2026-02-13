import * as React from "react";

const badgeStyles = {
    default: "border-transparent bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200",
    destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
    outline: "border-gray-300 text-gray-700 hover:bg-gray-50",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: keyof typeof badgeStyles;
}

export function Badge({
                          className = "",
                          variant = "default",
                          ...props
                      }: BadgeProps) {

    const baseClasses = "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-fit";

    const variantClass = badgeStyles[variant];

    return (
        <span
            className={`${baseClasses} ${variantClass} ${className}`}
            {...props}
        />
    );
}