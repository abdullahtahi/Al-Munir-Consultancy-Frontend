import { baseUrl } from 'src/services/default';
import { getFetcher } from '../globalFetcher';

export const buildVesselsByAttributesUrl = async (
  companyId: string,
  terminalId: string,
  options?: Record<string, any>
) => {
  const queryString = options ? new URLSearchParams(options).toString() : '';
  const url = `${baseUrl}/api/companies/${companyId}/terminals/${terminalId}/vessels/search/by-attributes?${queryString}`;
  return await getFetcher(url);
};

export const buildVoyagesByAttributesUrl = async (
  companyId: string,
  terminalId: string,
  vesselId?: number,
  params: Record<string, any> = {}
) => {
  const qs = new URLSearchParams(params).toString();
  const url = `${baseUrl}/api/companies/${companyId}/terminals/${terminalId}/vessels/${vesselId}/voyages/by-attributes?${qs}`;
  return await getFetcher(url);
};
