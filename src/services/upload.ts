import { baseUrl, headers, post } from './default';

interface ApiResponse {
  resStatus?: number;
  message?: string;
  [key: string]: any;
}

const defaultResponse = async (res: Response): Promise<ApiResponse> => {
  const status = res.status;
  const json = await res.json();
  if (status >= 400) {
    if (status === 413) {
      return { resStatus: status, message: 'File size too large.' };
    }
    const message = json.message;
    return { resStatus: status, message };
  }
  return { ...json };
};

export const uploadImageCategory = (
  files: Array<File & { fkImageCategoryId: number; transitionId?: number; eirOutId?: number }>,
  directory: string = ''
): Promise<ApiResponse> => {
  const fd = new FormData();
  fd.append('directory', directory);

  // Append original file objects
  files.forEach((file) => {
    fd.append('upload-file[]', file, file.name);
  });

  const head = headers();
  // Remove Content-Type so the browser sets it automatically
  delete (head as any)['Content-Type'];

  const firstFile = files[0];
  const queryParams = `imgType=${firstFile.fkImageCategoryId}&${
    firstFile.eirOutId ? `eirOutId=${firstFile.eirOutId}` : `transitionId=${firstFile.transitionId}`
  }`;

  return fetch(`${baseUrl}/api/uploads/transition-images?${queryParams}`, {
    headers: head,
    credentials: 'include',
    method: 'POST',
    body: fd
  }).then(defaultResponse);
};


export const uploadServiceImages = async (
  file: Array<File & { transitionId: number; serviceId: number }>,
  directory: string = ''
): Promise<ApiResponse> => {
  const fd = new FormData();
  fd.append('directory', directory);
  file.forEach((f) => {
    fd.append('upload-file[]', f, f.name);
  });

  const head = headers();

  const res = await fetch(
        `${baseUrl}/uploads/transition-service-images?transitionId=${file[0].transitionId}&serviceId=${file[0].serviceId}`,
        {
            headers: head,
            credentials: 'include',
            method: 'POST',
            body: fd
        }
    );
    return defaultResponse(res);
};

export const uploadImage = (file: File, directory: string = ''): Promise<ApiResponse> => {
  const fd = new FormData();
  fd.append('directory', directory);
  fd.append('upload-file', file);

  const head = headers();

  return fetch(`${baseUrl}/uploads/images`, {
    headers: head,
    credentials: 'include',
    method: 'POST',
    body: fd
  }).then(defaultResponse);
};

export const uploadFavicon = (file: File, directory: string = ''): Promise<ApiResponse> => {
  const fd = new FormData();
  fd.append('directory', directory);
  fd.append('upload-file', file);

  const head = headers();

  return fetch(`${baseUrl}/uploads/favicons`, {
    headers: head,
    credentials: 'include',
    method: 'POST',
    body: fd
  }).then(defaultResponse);
};

export const uploadDocument = (
  file: File,
  directory: string = '',
  deleteFile: string = ''
): Promise<ApiResponse> => {
  const fd = new FormData();
  fd.append('directory', directory);
  fd.append('upload-file', file);
  fd.append('deleteFile', deleteFile);

  const head = headers();

  return fetch(`${baseUrl}/uploads/documents`, {
    headers: head,
    credentials: 'include',
    method: 'POST',
    body: fd
  }).then(defaultResponse);
};

export const uploadShippingLineDocuments = (
  file: File[],
  directory: string = '',
  deleteFile: string = ''
): Promise<ApiResponse> => {
  const fd = new FormData();
  fd.append('directory', directory);
  fd.append('deleteFile', deleteFile);
  file.forEach((f) => {
    fd.append('upload-file[]', f, f.name);
  });

  const head = headers();

  return fetch(`${baseUrl}/uploads/files`, {
    headers: head,
    credentials: 'include',
    method: 'POST',
    body: fd
  }).then(defaultResponse);
};

export const uploadFasahDocument = (
  file: File[],
  directory: string = '',
  deleteFile: string = '',
  terminalId: string = ''
): Promise<ApiResponse> => {
  const fd = new FormData();
  fd.append('directory', directory);
  file.forEach((f) => {
    fd.append('upload-file[]', f, f.name);
  });
  fd.append('terminalId', terminalId);
  fd.append('deleteFile', deleteFile);

  const head = headers();

  return fetch(`${baseUrl}/uploads/fasah/invoice`, {
    headers: head,
    credentials: 'include',
    method: 'POST',
    body: fd
  }).then(defaultResponse);
};

export const deleteDocument = (file: string, directory: string): Promise<ApiResponse> => {
  const head = headers();
  return fetch(`${baseUrl}/uploads/delete`, {
    headers: head,
    credentials: 'include',
    method: 'DELETE',
    body: JSON.stringify({ deleteFile: file, directory })
  }).then(defaultResponse);
};

export const uploadEdi = (file: File, params: Record<string, string>): Promise<ApiResponse> => {
  const qs = new URLSearchParams(params).toString();
  const fd = new FormData();
  fd.append('upload-file', file);

  const head = headers();

  return fetch(`${baseUrl}/uploads/edi?${qs}`, {
    headers: head,
    credentials: 'include',
    method: 'POST',
    body: fd
  }).then(defaultResponse);
};
