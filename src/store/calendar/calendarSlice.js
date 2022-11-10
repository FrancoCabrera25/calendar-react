import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvents = [
    {
      _id: new Date().getTime(),
      title: "prueba",
      notes: "lalala",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafafa",
    },
  ];
export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: tempEvents,
    activeEvent: null,

  },
  reducers: {
     onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
     }
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions;
