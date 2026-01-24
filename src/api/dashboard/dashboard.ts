import { baseUrl, destroy, get, put, post } from 'src/services/default';

const api = `${baseUrl}/api/v1/dashboard`;

export const getOverview = async (params: any = {}) => {
  const url = `${api + '/overview'}`;
  return await get(url);
};

export const getAdmissionGrowth = async () => {
  return await get(`${api + '/admission-growth'}`);
};

export const getBonusGrowth = async () => {
  return await get(api + '/bonus-growth');
};

export const topEarner = async () => {
  return await get(api + '/top-earners');
};
export const UserTeamStructure = async () => {
  return await get(api + '/my-team-and-bonus');
};

export const deleteRole = async (id: number) => {
  return await destroy(`${api}/${id}`);
};
