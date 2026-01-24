import { baseUrl } from 'src/services/default';
import { getFetcher } from '../globalFetcher';

export const getTruckDriversByAttributes = async (
  companyId: string,
  terminalId: string,
  transporterId?: string,
  options?: Record<string, any>
) => {
  const qs = options ? new URLSearchParams(options).toString() : '';
  const url = `${baseUrl}/api/companies/${companyId}/terminals/${terminalId}/firms/${transporterId}/drivers/truck-driver-by-attributes?${qs}`;
  return await getFetcher(url);
};

export const getAllTrucks = async (
  companyId: string,
  terminalId: string,
  options?: Record<string, any>
) => {
  const qs = options ? new URLSearchParams(options).toString() : '';
  const url = `${baseUrl}/api/companies/${companyId}/terminals/${terminalId}/trucks/get-all?${qs}`;
  return await getFetcher(url);
};

export const getTruckNumbers = async (
  companyId: string,
  terminalId: string,
  options?: Record<string, any>
) => {
  const qs = options ? new URLSearchParams(options).toString() : '';
  const url = `${baseUrl}/api/companies/${companyId}/terminals/${terminalId}/trucks/get-truck-numbers?${qs}`;
  return await getFetcher(url);
};

export const getAllDrivers = async (
  companyId: string,
  terminalId: string,
  options?: Record<string, any>
) => {
  const qs = options ? new URLSearchParams(options).toString() : '';
  const url = `${baseUrl}/api/companies/${companyId}/terminals/${terminalId}/drivers/get-all?${qs}`;
  return await getFetcher(url);
};

export const getDriverIds = async (
  companyId: string,
  terminalId: string,
  options?: Record<string, any>
) => {
  const qs = options ? new URLSearchParams(options).toString() : '';
  const url = `${baseUrl}/api/companies/${companyId}/terminals/${terminalId}/drivers/get-name-ids?${qs}`;
  return await getFetcher(url);
};
