"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  type TooltipProps
} from "recharts";

export function ChartContainer({
                                 children,
                                 className = ""
                               }: {
  children: React.ReactElement,
  className?: string
}) {
  return (
      <div className={`w-full aspect-video min-h-[300px] ${className}`}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
  );
}

// 2. Un Tooltip personnalisé au design "ImmoPulse" (propre et moderne)
export function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
        <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg text-xs">
          <p className="font-bold text-gray-900 mb-1">{label}</p>
          <div className="space-y-1">
            {payload.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-500">{item.name}:</span>
                  <span className="font-mono font-medium text-gray-900">
                {item.value?.toLocaleString()}
              </span>
                </div>
            ))}
          </div>
        </div>
    );
  }
  return null;
}