import * as React from "react";

const variants = {
  default: "background-primary text-white hover:bg-indigo-700 shadow-sm",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  link: "text-indigo-600 underline-offset-4 hover:underline",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 px-3 text-xs",
  lg: "h-12 px-8",
  icon: "h-10 w-10 justify-center",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "default", size = "default", ...props }, ref) => {

      const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 shrink-0";
      const variantClass = variants[variant];
      const sizeClass = sizes[size];

      const combinedClasses = `${baseClasses} ${variantClass} ${sizeClass} ${className}`;

      return (
          <button
              ref={ref}
              className={combinedClasses}
              {...props}
          />
      );
    }
);

Button.displayName = "Button";