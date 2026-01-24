import useSWR from 'swr';
import { buildVesselsByAttributesUrl } from '../vessels-voyages';

export const useVesselsByAttributes = (
  companyId: string,
  terminalId: string,
  options?: Record<string, any>
) => {
  const shouldFetch =
    companyId && terminalId && options?.name && options.name.length >= 3;

  const fetcherKey = shouldFetch
    ? [`vessels-by-attributes`, companyId, terminalId, options]
    : null;
  const { data, error, isLoading, mutate } = useSWR(
    fetcherKey,
    async () =>
      await buildVesselsByAttributesUrl(companyId, terminalId, options),
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
