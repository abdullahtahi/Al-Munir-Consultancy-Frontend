interface ApiResponse<T = any> {
  data?: T;
  resStatus?: number;
  message?: string;
  error?: {
    message: string;
    status: number;
  };
}

interface VersionCheckCallback {
  (serverVersion: string | null): void;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const headers = (): HeadersInit => {
  const xToken = localStorage.getItem('token');
  const localAppVersion = localStorage.getItem('app_version');
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(xToken && { Authorization: `Bearer ${xToken}` }),
    ...(localAppVersion &&
      localAppVersion !== 'null' && {
        'App-Version': localAppVersion,
      }),
  };
};

const isValidToken = (): boolean => {
  return !!localStorage.getItem('token');
};

const checkAppVersion = async (
  res: Response,
  onVersionMismatch?: VersionCheckCallback
): Promise<void> => {
  const serverAppVersion = res.headers.get('App-Version');
  const localAppVersion = localStorage.getItem('app_version');

  if (
    localAppVersion &&
    localAppVersion !== 'null' &&
    localAppVersion !== serverAppVersion
  ) {
    onVersionMismatch?.(serverAppVersion);
  } else if (
    (!localAppVersion || localAppVersion === 'null') &&
    serverAppVersion
  ) {
    localStorage.setItem('app_version', serverAppVersion);
  }
};

const defaultResponse = async <T = any>(
  res: Response,
  onVersionMismatch?: VersionCheckCallback
): Promise<ApiResponse<T>> => {
  const status = res.status;

  await checkAppVersion(res, onVersionMismatch);

  try {
    const data = await res.json();

    if (status === 403) {
      console.warn(
        `[default.ts] Received 403 Forbidden from ${res.url}. NOT removing token (fixed).`
      );
      return {
        resStatus: status,
        message: 'You do not have permission to access this resource.',
      };
    }

    if (status >= 400) {
      return {
        resStatus: status,
        message: data.message || 'Request failed',
      };
    }

    return { data };
  } catch (error) {
    return {
      resStatus: 500,
      message: 'Failed to parse response',
    };
  }
};

const get = async <T = any>(
  api: string,
  onVersionMismatch?: VersionCheckCallback
): Promise<ApiResponse<T> | null> => {
  if (!isValidToken()) return null;

  try {
    const res = await fetch(api, {
      headers: headers(),
      credentials: 'include',
      method: 'GET',
    });
    console.log(`[GET] ${api} - Status: ${res.status}`);
    return await defaultResponse<T>(res, onVersionMismatch);
  } catch (error) {
    return {
      resStatus: 500,
      message: 'Network error',
    };
  }
};

const getDownload = async <T = any>(
  api: string,
  onVersionMismatch?: VersionCheckCallback
): Promise<ApiResponse<T> | null> => {
  if (!isValidToken()) {
    return null;
  }
  try {
    const res = await fetch(api, {
      headers: headers(),
      credentials: 'include',
      method: 'GET',
    });
    return await defaultResponse<T>(res, onVersionMismatch);
  } catch (error) {
    return {
      resStatus: 500,
      message: 'Network error',
    };
  }
};

const isValidCro = async <T = any>(
  api: string,
  onVersionMismatch?: VersionCheckCallback
): Promise<ApiResponse<T> | null> => {
  try {
    const res = await fetch(api, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'GET',
    });
    return await defaultResponse<T>(res, onVersionMismatch);
  } catch (error) {
    return {
      resStatus: 500,
      message: 'Network error',
    };
  }
};

const post = async <T = any, D = any>(
  api: string,
  data: D,
  skipTokenCheck: boolean = false, // Add this parameter
  onVersionMismatch?: VersionCheckCallback
): Promise<ApiResponse<T> | null> => {
  if (!skipTokenCheck && !isValidToken()) {
    return null;
  }

  try {
    const xToken = localStorage.getItem('token');
    const response = await fetch(api, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(xToken && { Authorization: `Bearer ${xToken}` }),
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
    });

    return await defaultResponse<T>(response, onVersionMismatch);
  } catch (error) {
    console.error('POST request failed:', error);
    return {
      resStatus: 500,
      message:
        error instanceof Error ? error.message : 'Network request failed',
    };
  }
};

const put = async <T = any, D = any>(
  api: string,
  data: D,
  onVersionMismatch?: VersionCheckCallback
): Promise<ApiResponse<T> | null> => {
  if (!isValidToken()) {
    return null;
  }

  try {
    const response = await fetch(api, {
      headers: headers(),
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify(data),
    });

    return await defaultResponse<T>(response, onVersionMismatch);
  } catch (error) {
    console.error('PUT request failed:', error);
    return {
      resStatus: 500,
      message:
        error instanceof Error ? error.message : 'Network request failed',
    };
  }
};

const destroy = async <T = any>(
  api: string,
  onVersionMismatch?: VersionCheckCallback
): Promise<ApiResponse<T> | null> => {
  if (!isValidToken()) {
    return null;
  }

  try {
    const res = await fetch(api, {
      headers: headers(),
      credentials: 'include',
      method: 'DELETE',
    });
    return await defaultResponse<T>(res, onVersionMismatch);
  } catch (error) {
    return {
      resStatus: 500,
      message: 'Network error',
    };
  }
};

const toggle = async <T = any>(
  api: string,
  onVersionMismatch?: VersionCheckCallback
): Promise<ApiResponse<T> | null> => {
  if (!isValidToken()) {
    return null;
  }
  try {
    const res = await fetch(api, {
      headers: headers(),
      credentials: 'include',
      method: 'PUT',
    });
    return await defaultResponse<T>(res, onVersionMismatch);
  } catch (error) {
    return {
      resStatus: 500,
      message: 'Network error',
    };
  }
};

export const upload = async (url: string, file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');

    const response = await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      body: formData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export {
  baseUrl,
  destroy,
  get,
  getDownload,
  headers,
  isValidCro,
  post,
  put,
  toggle,
};
