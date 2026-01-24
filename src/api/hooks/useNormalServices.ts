// src/api/hooks/useTerminalFirmByAttributes.ts
import useSWR from 'swr';
import { getNormalServices } from '../services';

export const useToGetNormalServices = (
  companyId: string,
  terminalId: string,
  options: Record<string, any>
) => {
  const fetcherKey =
    companyId && terminalId && options
      ? [`normal-services-by-attributes`, companyId, terminalId, options]
      : null;
  const { data, error, isLoading, mutate } = useSWR(
    fetcherKey,
    async () => await getNormalServices(companyId, terminalId, options),
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
