
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type TierTypeFilter = 'All' | 'Solo' | 'Duo' | 'Collab';

interface PricingTierToggleProps {
  selectedTier: TierTypeFilter;
  onTierChange: (tier: TierTypeFilter) => void;
}

export const PricingTierToggle = ({ selectedTier, onTierChange }: PricingTierToggleProps) => {
  return (
    <div className="flex justify-center mb-8">
      <ToggleGroup 
        type="single" 
        variant="outline"
        value={selectedTier}
        onValueChange={(value) => {
          if (value) onTierChange(value as TierTypeFilter);
        }}
        className="bg-white rounded-lg p-1 shadow-sm"
      >
        <ToggleGroupItem 
          value="All"
          aria-label="Toggle All"
          className="font-manrope data-[state=on]:bg-gray-700 data-[state=on]:text-white data-[state=on]:border-gray-700"
        >
          All Packages
        </ToggleGroupItem>
        <ToggleGroupItem
          value="Solo"
          aria-label="Toggle Solo"
          className="font-manrope data-[state=on]:bg-[#EA3E3A] data-[state=on]:text-white data-[state=on]:border-[#EA3E3A]"
        >
          Solo
        </ToggleGroupItem>
        <ToggleGroupItem
          value="Duo"
          aria-label="Toggle Duo"
          className="font-manrope data-[state=on]:bg-[#F4A42C] data-[state=on]:text-white data-[state=on]:border-[#F4A42C]"
        >
          Duo
        </ToggleGroupItem>
        <ToggleGroupItem
          value="Collab"
          aria-label="Toggle Collab"
          className="font-manrope data-[state=on]:bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] data-[state=on]:text-white data-[state=on]:border-transparent"
        >
          Collab
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
