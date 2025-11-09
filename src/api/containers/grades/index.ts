// src/api/firm.ts

import { getFetcher } from "src/api/globalFetcher";
import { baseUrl } from "src/services/default";

export const getContainerGradesByAttributes = async(
    companyId: string,
    params: Record<string, any> = {}
) => {
  let qs = new URLSearchParams(params).toString();
  const url = `${baseUrl}/api/companies/${companyId}/container_grades/by-attributes?${qs}`;
  return await getFetcher(url);
};