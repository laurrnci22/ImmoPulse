"use client";

import * as React from "react";

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Slider = ({
                           className,
                           min = 0,
                           max = 100,
                           value,
                           defaultValue,
                           onChange,
                           ...props
                       }: SliderProps) => {
    return (
        <div className={`w-full flex flex-col gap-2 ${className}`}>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                className="
                    w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                    accent-indigo-600
                    hover:accent-indigo-700
                    focus:outline-none
                "
                {...props}
            />
        </div>
    );
};