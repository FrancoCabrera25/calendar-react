import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvents = [
    {
        _id: new Date().getTime(),
        title: 'prueba',
        notes: 'lalala',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#fafafafa',
    },
];
export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isloadingEvents: true,
        events: [],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map((event) => {
                if (event.id === payload.id) {
                    return payload;
                }
                return event;
            });
        },
        onDeleteEvent: (state) => {
            state.events = state.events.filter(
                (event) => event.id !== state.activeEvent.id
            );
            state.activeEvent = null;
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isloadingEvents = false;
            state.events = payload;
        },
        onClearEvents: (state) => {
            state.isloadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents,
    onClearEvents,
} = calendarSlice.actions;
