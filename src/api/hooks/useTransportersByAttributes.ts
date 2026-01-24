import useSWR from 'swr';
import { buildTransportersByAttributesUrl } from '../transporters';

export const useTransportersByAttributes = (
  companyId: string,
  terminalId: string,
  options: Record<string, any> = {}
) => {
  const shouldFetch =
    companyId && terminalId && options?.name && options.name.length >= 3;

  const fetcherKey = shouldFetch
    ? ['transporters-by-attributes', companyId, terminalId, options]
    : null;

  const { data, error, isLoading, mutate } = useSWR(
    fetcherKey,
    async () =>
      await buildTransportersByAttributesUrl(companyId, terminalId, options),
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
