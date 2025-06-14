
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
  const [currentImageAttempt, setCurrentImageAttempt] = useState(0);
  
  const { url, alt } = getImageWithFallback(source, config);

  const handleLoad = () => {
    console.log('Image loaded successfully:', url);
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    console.log('Image failed to load:', url);
    setIsLoading(false);
    setHasError(true);
    
    // Try fallback if available and we haven't tried it yet
    if (source.fallback && currentImageAttempt === 0) {
      console.log('Trying fallback image...');
      setCurrentImageAttempt(1);
      setIsLoading(true);
      setHasError(false);
    }
  };

  // Get the appropriate image source based on attempt
  const imageSource = currentImageAttempt === 0 ? source : (source.fallback || source);
  const { url: currentUrl, alt: currentAlt } = getImageWithFallback(imageSource, config);

  if (hasError && currentImageAttempt >= 1) {
    return (
      <div className={`${loadingClassName} bg-gray-100 flex items-center justify-center`}>
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <>
      {isLoading && <Skeleton className={loadingClassName} />}
      <img
        src={currentUrl}
        alt={currentAlt}
        className={`${className} ${isLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </>
  );
};
