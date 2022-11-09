import { NavBar } from "../components/NavBar";
import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import { localizer } from "../../helpers/calendarLocallizer";
import { getMessageES } from '../../helpers/getMessages';
import { addHours, parse, format , startOfWeek ,getDay} from "date-fns";



const events = [{
  title: 'prueba',
  note: 'lalala',
  start: new Date(),
  end:  addHours(new Date(), 2),
  bgColor: '#fafafafa'
}]
export const CalendarPage = () => {

  const eventStyleGetter = (event, start, end, isSelected) => {
      console.log({event, start, end, isSelected});
      const style = {
        backgroundColor: '#347CF7',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black'

      }
      return {
        style,
      }
  }
  return (
    <>
      <NavBar />
      <div>
        <Calendar
          culture='es'
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)' }}
          messages = {getMessageES()}
          eventPropGetter = { eventStyleGetter }
          components={{
            
          }}
        />
      </div>
    </>
  );
};
