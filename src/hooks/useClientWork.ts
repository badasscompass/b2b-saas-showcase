
import { useState, useEffect } from 'react';
import { UnifiedClientWork } from '@/types/unified';
import { dataService } from '@/services/dataService';

export const useClientWork = (serviceType: string) => {
  const [clientWorks, setClientWorks] = useState<UnifiedClientWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientWorks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const works = dataService.getClientWorksByService(serviceType);
        setClientWorks(works);
      } catch (err) {
        console.error('Error fetching client works:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchClientWorks();
  }, [serviceType]);

  return { 
    clientWorks, 
    loading, 
    error
  };
};

export const useClientWorkById = (id: string) => {
  const [clientWork, setClientWork] = useState<UnifiedClientWork | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientWork = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const work = dataService.getClientWorkById(id);
        setClientWork(work);
      } catch (err) {
        console.error('Error fetching client work:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchClientWork();
  }, [id]);

  return { clientWork, loading, error };
};
