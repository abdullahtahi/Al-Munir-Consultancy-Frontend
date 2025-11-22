import { baseUrl, get, post } from './default';
interface User {
  id: string;
  email: string;
  roles?: string[];
}
interface SignInResponse {
  accessToken: string;
  user: User;
  message?: string;
  status: number,
  ok: boolean
}
interface ApiError {
  message: string;
  status: number;  // Made status required
}
interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}
export const signIn = async (
  email: string,
  password: string,
): Promise<ApiResponse<SignInResponse>> => {
  try {
    const response = await post<SignInResponse>(`${baseUrl.replace(/\/$/, '')}/auth/login`, {
      email,
      password,
    }, true);
    if (!response) {
      return {
        error: {
          message: 'No response from server',
          status: 500
        }
      };
    }
    if (!response?.data?.accessToken) {
      return {
        error: {
          message: 'Incorrect Crentential',
          status: 401
        }
      };
    }
    if (response.error) {
      return {
        error: {
          message: '',
          status: 401
        }
      };
    }
    localStorage.setItem('token', response?.data?.accessToken);
    return response
  } catch (error) {
    console.error('SignIn error:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'Authentication failed',
        status: 500  // Added definite status
      }
    };
  }
};
export const signOutMe = async () => {
  try {
    const response = await get(`${baseUrl.replace(/\/$/, '')}/auth/logout`);
    localStorage.removeItem('token');
    return response;
  } catch (error) {
    console.error('SignOut error:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'Logout failed',
        status: 500  // Added definite status
      }
    };
  }
};
export const getUserContext = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await get(`${baseUrl.replace(/\/$/, '')}/auth/profile`);
    if (!response) {
      return {
        error: {
          message: 'Not authenticated',
          status: 401  // Added definite status
        }
      };
    }
    return response;
  } catch (error) {
    console.error('GetUserContext error:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'Failed to fetch user context',
        status: 500  // Added definite status
      }
    };
  }
};
export const getTerminals = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await get(`${baseUrl.replace(/\/$/, '')}/companies/${import.meta.env.VITE_COMPANY_ID}/terminals`);
    if (!response) {
      return {
        error: {
          message: 'Not authenticated',
          status: 401  // Added definite status
        }
      };
    }
    return response;
  } catch (error) {
    console.error('GetUserContext error:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'Failed to fetch user context',
        status: 500  // Added definite status
      }
    };
  }
};
export const getLookup = async (terminalId: any): Promise<ApiResponse<User>> => {
  try {
    const response = await get(`${baseUrl.replace(/\/$/, '')}/lookup?companyId=${import.meta.env.VITE_COMPANY_ID}&terminalId=${terminalId}`);
    if (!response) {
      return {
        error: {
          message: 'Not authenticated',
          status: 401  // Added definite status
        }
      };
    }
    return response;
  } catch (error) {
    console.error('GetLookup error:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'Failed to fetch user context',
        status: 500  // Added definite status
      }
    };
  }
};
export const getCompanies = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await get(`${baseUrl.replace(/\/$/, '')}/companies`);
    if (!response) {
      return {
        error: {
          message: 'Not authenticated',
          status: 401  // Added definite status
        }
      };
    }
    return response;
  } catch (error) {
    console.error('GetUserContext error:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'Failed to fetch user context',
        status: 500  // Added definite status
      }
    };
  }
};
export const forgotPassword = async (
  username: string,
): Promise<ApiResponse<SignInResponse>> => {
  try {
    const response = await post<SignInResponse>(`${baseUrl.replace(/\/$/, '')}/user/forgot-password`, {
      username,
    }, true);
    if (!response) {
      return {
        error: {
          message: 'No response from server',
          status: 500  // Added definite status
        }
      };
    }
    return response
  } catch (error) {
    console.error('Forget Password error:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'Authentication failed',
        status: 500  // Added definite status
      }
    };
  }
};