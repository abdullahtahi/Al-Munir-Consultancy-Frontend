import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import depotReducer from './slices/depotSlice';
import themeCustomizerReducer from './slices/themeCustomizerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    themeCustomizer: themeCustomizerReducer,
    depot: depotReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/signIn/fulfilled'], // Ignore these actions in serializable check
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
