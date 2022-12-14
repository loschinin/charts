import { configureStore } from '@reduxjs/toolkit';
import chartReducer from './chartSlice';

const store = configureStore({
  reducer: {
    charts: chartReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
