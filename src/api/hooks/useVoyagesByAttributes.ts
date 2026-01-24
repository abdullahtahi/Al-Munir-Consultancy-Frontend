import useSWR from 'swr';
import { buildVoyagesByAttributesUrl } from '../vessels-voyages';

export const useVoyagesByAttributes = (
  companyId: string,
  terminalId: string,
  vesselId?: number,
  options: Record<string, any> = {}
) => {
  const shouldFetch = !!(companyId && terminalId && vesselId);

  const fetcherKey = shouldFetch
    ? ['voyages-by-attributes', companyId, terminalId, vesselId, options]
    : null;

  const { data, error, isLoading, mutate } = useSWR(
    fetcherKey,
    async () =>
      await buildVoyagesByAttributesUrl(
        companyId,
        terminalId,
        vesselId,
        options
      ),
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
