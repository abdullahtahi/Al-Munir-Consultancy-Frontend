// src/api/firm.ts

import { baseUrl } from 'src/services/default';
import { getFetcher } from '../globalFetcher';

export const buildTransportersByAttributesUrl = async (
  companyId: string,
  terminalId: string,
  params: Record<string, any> = {}
) => {
  const qs = new URLSearchParams(params).toString();
  const url = `${baseUrl}/api/companies/${companyId}/terminals/${terminalId}/firms/search/by-attributes?${qs}`;
  return await getFetcher(url);
};
