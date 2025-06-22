import React from "react";
import clsx from 'clsx'

type ButtonProps = {
    onClick?:()=>void
    children:React.ReactNode
    disabled?:boolean
    variant?: "primary" | "secondary" | "danger" | "outline";
    size?: "sm" | "md" | "lg";
    className?: string;
}
const Button:React.FC<ButtonProps> = ({ onClick,
  children,
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",}) => {
    const baseStyles = "font-medium rounded-lg transition focus:outline-none focus:ring-2";
    const sizeStyles = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
    secondary: "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
    outline: "border border-gray-400 text-gray-600 bg-gray-100 hover:bg-gray-200 focus:ring-gray-400",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
