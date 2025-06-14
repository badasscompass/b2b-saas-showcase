
import { useState, memo } from 'react';
import { ImageSource, ImageConfig } from '@/types/image';
import { OptimizedImageService } from '@/services/optimizedImageService';
import { useLazyLoad } from '@/hooks/useLazyLoad';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  source: ImageSource;
  config?: ImageConfig;
  className?: string;
  loadingClassName?: string;
  lazy?: boolean;
  priority?: boolean;
}

export const OptimizedImage = memo(({ 
  source, 
  config, 
  className = "", 
  loadingClassName = "w-full h-full",
  lazy = true,
  priority = false
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { elementRef, isIntersecting } = useLazyLoad<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  const shouldLoad = !lazy || isIntersecting || priority;
  const { url, alt } = OptimizedImageService.getWithFallback(source, config);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div 
        ref={elementRef}
        className={`${loadingClassName} bg-gray-100 flex items-center justify-center`}
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div ref={elementRef} className={loadingClassName}>
      {isLoading && shouldLoad && <Skeleton className={loadingClassName} />}
      {shouldLoad && (
        <img
          src={url}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy && !priority ? 'lazy' : 'eager'}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';
