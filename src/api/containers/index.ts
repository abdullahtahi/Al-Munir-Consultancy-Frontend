// src/api/firm.ts

import { baseUrl } from "src/services/default";
import { getFetcher } from "../globalFetcher";

export const getContainersByAttributes = async(
    companyId: string,
    terminalId: string,
    params: Record<string, any> = {}
) => {
  let qs = new URLSearchParams(params).toString();
  const url = `${baseUrl}/api/companies/${companyId}/terminals/${terminalId}/containers/by-attributes?${qs}`;
  return await getFetcher(url);
};