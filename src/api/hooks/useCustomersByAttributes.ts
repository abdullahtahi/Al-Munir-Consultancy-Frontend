// src/api/hooks/useTerminalFirmByAttributes.ts
import useSWR from 'swr';
import { getCustomersByAttributesSearch } from '../terminals';

export const useCustomersByAttributes = (
  companyId: string,
  terminalId: string,
  options: Record<string, any>
) => {
  const shouldFetch =
    companyId && terminalId && options?.name && options.name.length >= 3;

  const fetcherKey = shouldFetch
    ? [`terminal-firm-by-attributes`, companyId, terminalId, options]
    : null;

  const { data, error, isLoading, mutate } = useSWR(
    fetcherKey,
    async () =>
      await getCustomersByAttributesSearch(companyId, terminalId, options),
    {
      revalidateOnMount: true,
      revalidateonFocus: false,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
