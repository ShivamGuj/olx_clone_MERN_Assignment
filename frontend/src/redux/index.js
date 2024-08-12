import {configureStore} from '@reduxjs/toolkit'
import userSliceReducer from "./userSlice.js";

export const store = configureStore({
    reducer: {
      user : userSliceReducer,  
    },
  });