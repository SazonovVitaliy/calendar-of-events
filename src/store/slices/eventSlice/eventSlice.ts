import { IEvent } from "./../../../models/IEvent";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";
import { EventState } from "./types";

const initialState: EventState = {
  events: JSON.parse(localStorage.getItem("events") || "[]"),
  guests: JSON.parse(localStorage.getItem("guests") || "[]"),
};

export const eventSlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {
    setGuests(state: EventState, action: PayloadAction<IUser[]>) {
      state.guests = action.payload;
      localStorage.setItem("guests", JSON.stringify(state.guests));
    },
    setEvents(state: EventState, action: PayloadAction<IEvent[]>) {
      state.events.concat(action.payload);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    createEvent(state: EventState, action: PayloadAction<IEvent>) {
      state.events.push(action.payload);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
  },
});

export const eventAction = eventSlice.actions;
export const eventReducer = eventSlice.reducer;
