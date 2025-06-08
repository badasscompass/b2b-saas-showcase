
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
}

export const SectionHeader = ({ title, subtitle, alignment = 'center' }: SectionHeaderProps) => {
  const alignmentClass = alignment === 'center' ? 'text-center' : 'text-left';
  const dividerClass = alignment === 'center' ? 'mx-auto' : '';

  return (
    <div className={`mb-12 md:mb-16 ${alignmentClass}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
        {title}
      </h2>
      <div className={`w-16 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] ${dividerClass}`}></div>
      {subtitle && (
        <p className="text-lg text-gray-600 font-manrope max-w-3xl mx-auto leading-relaxed mt-6">
          {subtitle}
        </p>
      )}
    </div>
  );
};
