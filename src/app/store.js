import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../actions/user.actions';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
