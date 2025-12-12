import React from 'react';
import { cn } from '@/lib/utils';
import { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
    suffixIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, suffixIcon, type, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                <label className="text-sm font-bold text-black font-header block tracking-wide">
                    {label}
                </label>
                <div className="relative">
                    <input
                        type={type}
                        className={cn(
                            "flex h-[46px] w-full rounded-lg border border-[#E0E0E0] bg-white px-4 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FD5725] focus:border-[#FD5725] disabled:cursor-not-allowed disabled:opacity-50 transition-all font-sans",
                            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
                            suffixIcon && "pr-10",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {suffixIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            {suffixIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <span className="text-xs text-red-500 font-medium mt-1 block">{error.message}</span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
export default Input;