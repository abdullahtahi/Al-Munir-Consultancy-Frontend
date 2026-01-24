import { baseUrl, get, post } from 'src/services/default';

const api = `${baseUrl}/api/v1/role-permission`;

export const getPermissionsByRole = async (roleId: number) => {
  return await get(`${api}?roleId=${roleId}`);
};

export const assignPermissionsToRole = async (data: {
  roleId: number;
  permissionIds: number[];
}) => {
  return await post(`${api}/assign`, data);
};
