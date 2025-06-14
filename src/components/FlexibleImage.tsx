
import { useState } from 'react';
import { ImageSource, ImageConfig } from '@/types/image';
import { getImageWithFallback } from '@/utils/imageUtils';
import { Skeleton } from '@/components/ui/skeleton';

interface FlexibleImageProps {
  source: ImageSource;
  config?: ImageConfig;
  className?: string;
  loadingClassName?: string;
}

export const FlexibleImage = ({ 
  source, 
  config, 
  className = "", 
  loadingClassName = "w-full h-full" 
}: FlexibleImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const { url, alt } = getImageWithFallback(source, config);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (isLoading) {
    return <Skeleton className={loadingClassName} />;
  }

  if (hasError) {
    return (
      <div className={`${loadingClassName} bg-gray-100 flex items-center justify-center`}>
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};
