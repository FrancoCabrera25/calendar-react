import { useSelector, useDispatch } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const distpatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    distpatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      distpatch(onUpdateEvent(calendarEvent));
    } else {
      distpatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const deleteEvent = () => {
    distpatch(onDeleteEvent());
  }

  return {
    events,
    activeEvent,

    setActiveEvent,
    startSavingEvent,
    deleteEvent
  };
};
