import useSWR from 'swr';
import {
  getAllDrivers,
  getAllTrucks,
  getDriverIds,
  getTruckDriversByAttributes,
  getTruckNumbers,
} from '../truck-driver';

export const useTruckDriverByAttributes = (
  companyId: string,
  terminalId: string,
  transporterId?: string,
  options: Record<string, any> = {},
  enabled: boolean = true
) => {
  // Check all possible search keys with min length 3
  const hasValidSearch =
    (options.truckId && options.truckId.length >= 3) ||
    (options.driverId && options.driverId.length >= 3);

  const shouldFetch =
    enabled && companyId && terminalId && transporterId && hasValidSearch;

  const fetcherKey = shouldFetch
    ? [
        'truck-driver-by-attributes',
        companyId,
        terminalId,
        transporterId,
        options,
      ]
    : null;

  const { data, error, isLoading, mutate } = useSWR(
    fetcherKey,
    () =>
      getTruckDriversByAttributes(
        companyId,
        terminalId,
        transporterId,
        options
      ),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  return { data, error, isLoading, mutate };
};

export const useAllTrucks = (
  companyId: string,
  terminalId: string,
  options: Record<string, any> = {}
) => {
  const shouldFetch = !!(companyId && terminalId);
  const fetcherKey = shouldFetch
    ? ['all-trucks', companyId, terminalId, options]
    : null;

  const { data, error, isLoading, mutate } = useSWR(
    fetcherKey,
    () => getAllTrucks(companyId, terminalId, options),
    { revalidateOnMount: true, revalidateOnFocus: false }
  );

  return { data, error, isLoading, mutate };
};

export const useTruckNumbers = (
  companyId: string,
  terminalId: string,
  options: Record<string, any> = {},
  enabled: boolean = true
) => {
  const searchValue = options.truckNumber || '';
  const hasValidSearch = searchValue.length >= 3;

  const shouldFetch = enabled && !!companyId && !!terminalId && hasValidSearch;
  const fetcherKey = shouldFetch
    ? ['truck-numbers', companyId, terminalId, options]
    : null;

  const { data, error, isLoading, mutate } = useSWR(
    fetcherKey,
    () => getTruckNumbers(companyId, terminalId, options),
    { revalidateOnMount: true, revalidateOnFocus: false }
  );

  return { data, error, isLoading, mutate };
};

export const useAllDrivers = (
  companyId: string,
  terminalId: string,
  options: Record<string, any> = {}
) => {
  const shouldFetch = !!(companyId && terminalId);
  const fetcherKey = shouldFetch
    ? ['all-drivers', companyId, terminalId, options]
    : null;

  const { data, error, isLoading, mutate } = useSWR(
    fetcherKey,
    () => getAllDrivers(companyId, terminalId, options),
    { revalidateOnMount: true, revalidateOnFocus: false }
  );

  return { data, error, isLoading, mutate };
};

export const useDriverIds = (
  companyId: string,
  terminalId: string,
  options: Record<string, any> = {},
  enabled: boolean = true
) => {
  const searchValue = options.driverId || '';
  const hasValidSearch = searchValue.length >= 3;

  const shouldFetch = enabled && !!companyId && !!terminalId && hasValidSearch;

  const fetcherKey = shouldFetch
    ? ['driver-ids', companyId, terminalId, options]
    : null;

  const { data, error, isLoading, mutate } = useSWR(
    fetcherKey,
    () => getDriverIds(companyId, terminalId, options),
    { revalidateOnMount: true, revalidateOnFocus: false }
  );

  return { data, error, isLoading, mutate };
};
