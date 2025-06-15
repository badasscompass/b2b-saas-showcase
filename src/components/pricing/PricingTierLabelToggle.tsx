
import * as React from "react";

export type TierLabelState = "Solo" | "Duo" | "Collab";

interface PricingTierLabelToggleProps {
  selected: TierLabelState;
  onChange: (state: TierLabelState) => void;
}

const options: { value: TierLabelState; label: string; color: string }[] = [
  { value: "Solo", label: "Solo", color: "bg-[#EA3E3A]"},
  { value: "Duo", label: "Duo", color: "bg-[#F4A42C]"},
  { value: "Collab", label: "Collab", color: "bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C]"},
];

export const PricingTierLabelToggle = ({
  selected,
  onChange,
}: PricingTierLabelToggleProps) => (
  <div className="flex justify-center mb-8">
    <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
      {options.map(({ value, label, color }) => {
        const isActive = selected === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            className={`font-manrope rounded-md px-6 py-2 transition-all text-sm font-semibold
              ${isActive ? `${color} text-white ${value==="Collab" ? "border-0" : "border"} shadow-[0_2px_6px_rgba(234,62,58,.07)]` : "bg-transparent text-gray-700"}
              ${isActive && value !== "Collab" ? "border" : ""}
              ${isActive ? "" : "hover:bg-gray-100"}
              focus:outline-none mx-1`}
            style={value === "Collab" && isActive ? {
              backgroundClip: "text",
              color: "#fff",
              border: "none"
            } : {}}
            onClick={() => !isActive && onChange(value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  </div>
);
