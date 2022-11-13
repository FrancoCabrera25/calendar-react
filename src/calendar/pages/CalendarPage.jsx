import { NavBar } from '../components/NavBar';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../../helpers/calendarLocallizer';
import { getMessageES } from '../../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
export const CalendarPage = () => {
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, activeEvent, startLoadingEvent } =
        useCalendarStore();

    const { user } = useAuthStore();

    const [lastView, setLastView] = useState(
        localStorage.getItem('lastView') || 'week'
    );

    const eventStyleGetter = (event, start, end, isSelected) => {
        const isMyEvent =
            user.id === event.user._id || user.id === event.user.id;
        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
        };
        return {
            style,
        };
    };

    const onDoubleClick = (event) => {
        openDateModal();
    };

    const onSelected = (event) => {
        setActiveEvent(event);
    };

    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        setLastView(event);
    };

    useEffect(() => {
        startLoadingEvent();
    }, []);

    return (
        <>
            <NavBar />
            <div>
                <Calendar
                    culture='es'
                    localizer={localizer}
                    events={events}
                    defaultView={lastView}
                    startAccessor='start'
                    endAccessor='end'
                    style={{ height: 'calc(100vh - 80px)' }}
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
            <FabAddNew />
            {activeEvent && <FabDelete />}
        </>
    );
};
