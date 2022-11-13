import { useSelector, useDispatch } from 'react-redux';
import {
    onAddNewEvent,
    onDeleteEvent,
    onSetActiveEvent,
    onUpdateEvent,
    onLoadEvents,
} from '../store/calendar/calendarSlice';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers/convertEventsToDateEvents';

export const useCalendarStore = () => {
    const distpatch = useDispatch();

    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);

    const setActiveEvent = (calendarEvent) => {
        distpatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent.id) {
                const { data } = await calendarApi.put(
                    `/events/${calendarEvent.id}`,
                    calendarEvent
                );
                distpatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            //create
            const { data } = await calendarApi.post('/events', calendarEvent);
            distpatch(
                onAddNewEvent({ ...calendarEvent, id: data.event.id, user })
            );
        } catch (error) {
            console.log('error', error.response.data.msg);
        }
    };

    const deleteEvent = async () => {
        try {
            const { data } = await calendarApi.delete(`/events/${activeEvent.id}`);
            distpatch(onDeleteEvent());
        } catch (error) {
          console.log('error cargando eventos', error);
        }
    };

    const startLoadingEvent = async () => {
        try {
            const { data } = await calendarApi.get('/events');

            const events = convertEventsToDateEvents(data.events);
            distpatch(onLoadEvents(events));
        } catch (error) {
            console.log('error cargando eventos', error);
        }
    };

    return {
        events,
        activeEvent,

        startLoadingEvent,
        setActiveEvent,
        startSavingEvent,
        deleteEvent,
    };
};
