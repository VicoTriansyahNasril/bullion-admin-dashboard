import React from 'react';
import { cn } from '@/lib/utils';
import { FieldError } from 'react-hook-form';
import PolygonIcon from '@/assets/Polygon 1.svg';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: FieldError;
    options: { value: string; label: string }[];
    placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, placeholder = "Pilih...", ...props }, ref) => {
        return (
            <div className="space-y-2">
                <label className="text-sm font-bold text-black font-header block tracking-wide">
                    {label}
                </label>
                <div className="relative">
                    <select
                        ref={ref}
                        className={cn(
                            "flex h-[46px] w-full rounded-lg border border-[#E0E0E0] bg-white px-3 py-2 text-sm text-black appearance-none focus:ring-1 focus:ring-[#FD5725] focus:border-[#FD5725] focus:outline-none transition-all font-sans cursor-pointer",
                            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
                            className
                        )}
                        {...props}
                    >
                        <option value="">{placeholder}</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <img src={PolygonIcon} alt="arrow" className="w-3 h-3" />
                    </div>
                </div>
                {error && (
                    <span className="text-xs text-red-500 font-medium mt-1 block">
                        {error.message}
                    </span>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";
export default Select;