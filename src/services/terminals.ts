import { baseUrl, get, post, put } from './default';

export const getAllEIROuts = (terminalId:any, params = '') => {
  let qs = new URLSearchParams(params).toString();
  return get(
    `${baseUrl}/api/companies/${import.meta.env.VITE_COMPANY_ID}/terminals/${terminalId}/eir/out?${qs}`
  );
};

export const updateEirOutCount = (terminalId:any, eiroutId:any) => {
  return put(
    `${baseUrl}/api/companies/${import.meta.env.VITE_COMPANY_ID}/terminals/${terminalId}/eir/out/${eiroutId}/count`,''
  );
}; 

export const deleteTransitionImages = (terminalId:number, params:string) => {
  return put(
    `${baseUrl}/api/companies/${import.meta.env.VITE_COMPANY_ID}/terminals/${terminalId}/ContainerTransitionImages/delete`,
    params
  );
};

export const deleteTransitionServiceImage = (terminalId:number, params:string) => {
  return put(
    `${baseUrl}/api/companies/${import.meta.env.VITE_COMPANY_ID}/terminals/${terminalId}/ContainerTransitionServiceImages/delete`,
    params
  );
};

export const getTransitionServiceImages = (terminalId:number, options = {}) => {
  const pageOptions = new URLSearchParams(options).toString();
  return get(
    `${baseUrl}/api/companies/${import.meta.env.VITE_COMPANY_ID}/terminals/${terminalId}/ContainerTransitionServiceImages?${pageOptions}`
  );
};

export const getTransitionImages = (terminalId:number, options = {}) => {
  const pageOptions = new URLSearchParams(options).toString();
  return get(
    `${baseUrl}/api/companies/${import.meta.env.VITE_COMPANY_ID}/terminals/${terminalId}/ContainerTransitionImages?${pageOptions}`
  );
};

export const getImageCategories = (terminalId:number, params = '') => {
  let qs = new URLSearchParams(params).toString();
  return get(
    `${baseUrl}/api/companies/${import.meta.env.VITE_COMPANY_ID}/terminals/${terminalId}/image-categories?${qs}`
  );
};

export const addContainerImages = (terminalId:number, uploadedFiles={}) => {
  return post(
    `${baseUrl}/api/companies/${import.meta.env.VITE_COMPANY_ID}/terminals/${terminalId}/ContainerTransitionImages`,
    uploadedFiles
  );
};

export const getContainerGradesByAttributes = (params = {}
) => {
  let qs = new URLSearchParams(params).toString();
  return get(
    `${baseUrl}/api/companies/${import.meta.env.VITE_COMPANY_ID}/container_grades/by-attributes?${qs}`
  );
};

export const isRevertable = (terminalId: number, params: {}) => {
  let qs = new URLSearchParams(params).toString();
  return get(
    `${baseUrl}/api/companies/${import.meta.env.VITE_COMPANY_ID}/terminals/${terminalId}/eir/out/isRevertable?${qs}`
  );
};

export const revertEIROut = (terminalId: number, eiroutId: number | undefined, eirout:{}) => {
  return put(
    `${baseUrl}/api/companies/${import.meta.env.VITE_COMPANY_ID}/terminals/${terminalId}/eir/out/${eiroutId}/revert`,
    eirout
  );
};