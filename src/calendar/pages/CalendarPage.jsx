import { NavBar } from "../components/NavBar";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "../../helpers/calendarLocallizer";
import { getMessageES } from "../../helpers/getMessages";
import { addHours, parse, format, startOfWeek, getDay } from "date-fns";
import { CalendarEvent } from "../components/CalendarEvent";
import { useState } from "react";
import { CalendarModal } from '../components/CalendarModal';
const events = [
  {
    title: "prueba",
    note: "lalala",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafafa",
  },
];
export const CalendarPage = () => {

 const[lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log({ event, start, end, isSelected });
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    console.log('duble', event);
  };

  const onSelected = (event) => {
    console.log('click',event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };


  return (
    <>
      <NavBar />
      <div>
        <Calendar
          culture="es"
          localizer={localizer}
          events={events}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100vh - 80px)" }}
          messages={getMessageES()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelected}
          onView={onViewChanged}

        />
      </div>
      <CalendarModal />
    </>
  );
};
