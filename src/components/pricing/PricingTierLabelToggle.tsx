
import * as React from "react";

export type TierLabelState = "Solo" | "Duo" | "Collab";

interface PricingTierLabelToggleProps {
  selected: TierLabelState;
  onChange: (state: TierLabelState) => void;
  disableDuo?: boolean;
  disableCollab?: boolean;
}

const options: { value: TierLabelState; label: string; color: string }[] = [
  { value: "Solo", label: "Solo", color: "bg-[#EA3E3A]"},
  { value: "Duo", label: "Duo", color: "bg-[#F4A42C]"},
  { value: "Collab", label: "Collab", color: "bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C]"},
];

export const PricingTierLabelToggle = ({
  selected,
  onChange,
  disableDuo = false,
  disableCollab = false,
}: PricingTierLabelToggleProps) => {
  // Explanatory notes
  const definition =
    selected === "Duo"
      ? "Duo: Both product partners are engaged on the product project, each dividing work based on their area of expertise."
      : selected === "Collab"
      ? "Collab: Product partners are jointly engaged on the product project as mutual advisors and interchanging operationally."
      : null;

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
        {options.map(({ value, label, color }) => {
          const isActive = selected === value;
          const isDisabled =
            (value === "Duo" && disableDuo) || (value === "Collab" && disableCollab);
          return (
            <button
              key={value}
              type="button"
              aria-pressed={isActive}
              disabled={isDisabled}
              className={`font-manrope rounded-md px-6 py-2 transition-all text-sm font-semibold
                ${isActive ? `${color} text-white border shadow-[0_2px_6px_rgba(234,62,58,.07)]` : "bg-transparent text-gray-700"}
                ${!isActive && !isDisabled ? "hover:bg-gray-100" : ""}
                ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                focus:outline-none mx-1`}
              onClick={() => !isActive && !isDisabled && onChange(value)}
              title={isDisabled ? "Not available for Fractional tiers" : undefined}
            >
              {label}
            </button>
          );
        })}
      </div>
      {definition && (
        <div className="mt-2 font-manrope text-xs text-gray-700 text-center max-w-lg">
          {definition}
        </div>
      )}
    </div>
  );
};
