import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getCompanies,
  getLookup,
  getTerminals,
  getUserContext,
  signIn,
  signOutMe,
} from '../../services/auth';
import { RootState } from '../../store';

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  companies: any | null;
  lookups: any;
  terminals: any | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  companies: null, // Initialize
  lookups: null,
  terminals: null,
};

// Async thunks
export const signInUser = createAsyncThunk(
  '/login',
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response: any = await signIn(username, password);

      if (!response.data?.token) {
        return rejectWithValue(response.error || 'Login failed');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Login failed'
      );
    }
  }
);

export const signOutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOutMe();
      return true;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Logout failed'
      );
    }
  }
);

export const getAllTerminals = createAsyncThunk(
  '/terminal',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTerminals();
      if (!response.data) {
        throw new Error('Invalid terminals data format');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch terminals'
      );
    }
  }
);

export const lookUpAllThings = createAsyncThunk(
  `auth/lookUpAllThings`,
  async (terminalId: number | null, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const terminals = state.auth.terminals?.rows || [];
      const selectedDepot = terminalId ? terminalId : terminals[0].id;
      const response = await getLookup(selectedDepot);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Fetching failed'
      );
    }
  }
);

export const getAllCompanies = createAsyncThunk(
  '/companies',
  async (_, { rejectWithValue }) => {
    try {
      await getCompanies();
      return true;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Fetching failed'
      );
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/profile',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getUserContext();
      if (user.error || !user.data) {
        return rejectWithValue(user.error?.message || 'Failed to load user');
      }
      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to load user'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action?.payload?.accessToken;
        state.isAuthenticated = true;
        localStorage.setItem('token', action?.payload?.accessToken);
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Sign Out
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Load User
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
      })
      .addCase(lookUpAllThings.pending, (state) => {
        state.loading = true;
      })
      .addCase(lookUpAllThings.fulfilled, (state, action) => {
        state.loading = false;
        state.lookups = action.payload;
      })
      .addCase(lookUpAllThings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.loading = false;
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllTerminals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTerminals.fulfilled, (state, action) => {
        state.terminals = action.payload;
        state.loading = false;
      })
      .addCase(getAllTerminals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
