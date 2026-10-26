import { configureStore } from '@reduxjs/toolkit';
import applicationsReducer from './slices/applicationsSlice';
import drivesReducer from './slices/drivesSlice';
import candidatesReducer from './slices/candidatesSlice';

export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    drives: drivesReducer,
    candidates: candidatesReducer,
  },
});

export default store;
