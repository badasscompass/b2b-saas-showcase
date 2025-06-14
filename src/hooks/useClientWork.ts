
import { useState, useEffect } from 'react';
import { UnifiedClientWork } from '@/types/unified';
import { clientWorkService } from '@/services/clientWorkService';

export const useClientWork = (serviceType: string) => {
  const [clientWorks, setClientWorks] = useState<UnifiedClientWork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientWorks = async () => {
      setLoading(true);
      try {
        const works = clientWorkService.getClientWorksByService(serviceType);
        setClientWorks(works);
      } catch (error) {
        console.error('Error fetching client works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientWorks();
  }, [serviceType]);

  return { clientWorks, loading };
};

export const useClientWorkById = (id: string) => {
  const [clientWork, setClientWork] = useState<UnifiedClientWork | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientWork = async () => {
      setLoading(true);
      try {
        const work = clientWorkService.getClientWorkById(id);
        setClientWork(work);
      } catch (error) {
        console.error('Error fetching client work:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientWork();
  }, [id]);

  return { clientWork, loading };
};
