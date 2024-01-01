import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type FlightTicket = {
  id: number;
  flightCode: string;
  date: Date;
  capacity: number;
};

type FlightTicketsState = {
  data: FlightTicket[];
  loading: boolean;
  error: string | null;
};

const initialState: FlightTicketsState = {
  data: [],
  loading: false,
  error: null,
};

export const getFlightTickets = createAsyncThunk(
  "flightTickets/getFlightTickets",
  async () => {
    const response = await axios.get("http://localhost:3001/flightTickets");
    return response.data as FlightTicket[];
  }
);

export const addNewFlightTicket = createAsyncThunk(
  "flightTickets/addNewFlightTicket",
  async (newTicket: FlightTicket) => {
    console.log(newTicket);
    const response = await axios.post(
      "http://localhost:3001/flightTickets",
      newTicket
    );
    return response.data;
  }
);

export const deleteFlightTicket = createAsyncThunk(
  "flightTickets/deleteFlightTicket",
  async (ticketId: number) => {
    await axios.delete(`http://localhost:3001/flightTickets/${ticketId}`);
    return ticketId;
  }
);

export const updateFlightTicket = createAsyncThunk(
  "flightTickets/updateFlightTicket",
  async (updatedTicket: FlightTicket) => {
    const response = await axios.put(
      `http://localhost:3001/flightTickets/${updatedTicket.id}`,
      updatedTicket
    );
    return response.data as FlightTicket;
  }
);

const flightTicketsSlice = createSlice({
  name: "flightTickets",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFlightTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFlightTickets.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getFlightTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      })
      .addCase(addNewFlightTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewFlightTicket.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(addNewFlightTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      })
      .addCase(deleteFlightTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFlightTicket.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (ticket) => ticket.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteFlightTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      })
      .addCase(updateFlightTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFlightTicket.fulfilled, (state, action) => {
        const updatedTicketIndex = state.data.findIndex(
          (ticket) => ticket.id === action.payload.id
        );
        if (updatedTicketIndex !== -1) {
          state.data[updatedTicketIndex] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateFlightTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default flightTicketsSlice.reducer;
