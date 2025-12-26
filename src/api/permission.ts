import { baseUrl, get, post } from 'src/services/default';

const api = `${baseUrl}/api/v1/permission`;

export const getAllPermissions = async (params: any = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `${api}?${queryString}` : api;
  return await get(url);
};

export const addPermission = async (data: any) => {
  return await post(api, data);
};
