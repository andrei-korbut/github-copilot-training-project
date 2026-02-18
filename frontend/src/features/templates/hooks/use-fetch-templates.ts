import { useState, useEffect, useCallback } from 'react';
import { getAllMaintenanceTemplates } from '../api/templates-api';
import type { MaintenanceTemplate } from '../../../types/maintenance-template';

interface UseFetchTemplatesResult {
  templates: MaintenanceTemplate[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFetchTemplates(): UseFetchTemplatesResult {
  const [templates, setTemplates] = useState<MaintenanceTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllMaintenanceTemplates();
      setTemplates(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load templates';
      setError(errorMessage);
      setTemplates([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return {
    templates,
    isLoading,
    error,
    refetch: fetchTemplates,
  };
}
