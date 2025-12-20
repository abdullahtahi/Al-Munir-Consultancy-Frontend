import { baseUrl, destroy, get, put, post } from 'src/services/default';

const api = `${baseUrl}/api/v1/role`;

export const getAllRoles = async (params: any = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `${api}?${queryString}` : api;
  return await get(url);
};

export const getRoleById = async (id: number) => {
  return await get(`${api}/${id}`);
};

export const addRole = async (data: any) => {
  return await post(api, data);
};

export const updateRole = async (id: number, data: any) => {
  return await put(`${api}/${id}`, data);
};

export const deleteRole = async (id: number) => {
  return await destroy(`${api}/${id}`);
};
