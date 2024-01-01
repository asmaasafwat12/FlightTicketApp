import { configureStore } from "@reduxjs/toolkit";
import flightTicketsReducer from "./flightTicketsSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    flightTickets: flightTicketsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
