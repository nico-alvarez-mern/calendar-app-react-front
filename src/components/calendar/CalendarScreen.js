import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

import { Navbar } from '../ui/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendarMessagesEspañol';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventsClearActiveEvent, eventsSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

/* const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2,'hour').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar el pastel',
    user: {
        _id: '123',
        name: 'Nicolas'
    }
}] */

export const CalendarScreen = () => {
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const dispatch = useDispatch();
    const {events,activeEvent} = useSelector( state => state.calendar );
    const {uid} = useSelector( state => state.auth );

    useEffect(() => {
        dispatch( eventStartLoading() );
    }, [dispatch]);
    
    const onDoubleClick = (e)=>{
        console.log(e);
        dispatch( uiOpenModal() );
    }
    const onSelectEvent = (e)=>{
        dispatch( eventsSetActive(e) );
    }
    const onViewChange = (e)=>{
        setLastView(e);
        localStorage.setItem('lastView',e);
    }
    const onSelectSlot = (e)=>{
        dispatch( eventsClearActiveEvent() );
    }
    const eventStyleGetter = ( event,start,end,isSelected )=>{
        const style = {
            backgroundColor: (uid === event.user._id)  ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }
        return {
            style
        }
    }
    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                view={lastView}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                
            />
            <AddNewFab />
            {
                (activeEvent) &&
                <DeleteEventFab />
            }
            <CalendarModal />
        </div>
    )
}
