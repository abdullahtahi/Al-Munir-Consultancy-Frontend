import { baseUrl } from "src/services/default";
import { getFetcher } from "../globalFetcher";


export const getCustomersByAttributesSearch = async (
    companyId: string | number,
    terminalId: string | number,
    options: Record<string, any> = {}
) => {
    const qs = new URLSearchParams(options).toString();
    const url = `${baseUrl}/api/companies/${companyId}/terminals/${terminalId}/firms/search/by-attributes?${qs}`;
    return await getFetcher(url);
};
