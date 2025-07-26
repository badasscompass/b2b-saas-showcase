
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
          value="Solo"
          aria-label="Toggle Solo"
          className="font-manrope data-[state=on]:bg-[#EA3E3A] data-[state=on]:text-white data-[state=on]:border-[#EA3E3A]"
        >
          Solo
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
