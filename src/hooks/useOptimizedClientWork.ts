
import { useState, useEffect, useMemo } from 'react';
import { UnifiedClientWork } from '@/types/unified';
import { optimizedClientWorkService } from '@/services/optimizedClientWorkService';
import { PerformanceMonitor } from '@/utils/performanceMonitor';

export const useOptimizedClientWork = (serviceType: string) => {
  const [clientWorks, setClientWorks] = useState<UnifiedClientWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientWorks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        PerformanceMonitor.startMeasure(`useOptimizedClientWork:${serviceType}`);
        const works = await optimizedClientWorkService.getClientWorksByService(serviceType);
        setClientWorks(works);
      } catch (err) {
        console.error('Error fetching client works:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
        PerformanceMonitor.endMeasure(`useOptimizedClientWork:${serviceType}`);
      }
    };

    fetchClientWorks();
  }, [serviceType]);

  const memoizedClientWorks = useMemo(() => clientWorks, [clientWorks]);
  const cacheStats = useMemo(() => optimizedClientWorkService.getCacheStats(), [clientWorks]);

  return { 
    clientWorks: memoizedClientWorks, 
    loading, 
    error,
    cacheStats
  };
};

export const useOptimizedClientWorkById = (id: string) => {
  const [clientWork, setClientWork] = useState<UnifiedClientWork | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientWork = async () => {
      setLoading(true);
      setError(null);
      
      try {
        PerformanceMonitor.startMeasure(`useOptimizedClientWorkById:${id}`);
        const work = await optimizedClientWorkService.getClientWorkById(id);
        setClientWork(work);
      } catch (err) {
        console.error('Error fetching client work:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
        PerformanceMonitor.endMeasure(`useOptimizedClientWorkById:${id}`);
      }
    };

    fetchClientWork();
  }, [id]);

  return { clientWork, loading, error };
};
