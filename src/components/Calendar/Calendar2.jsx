import React, {useState , useEffect} from 'react'
import format from "date-fns/format";
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import {Calendar , dateFnsLocalizer} from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar2.css";
import "date-fns/locale/en-US";

const locales = {
    "en-US" : "date-fns/locale/en-US"
};

const localizer = dateFnsLocalizer({
    format,parse,startOfWeek,getDay,locales,
});

const events =  []

const Calendar2 = () => {
    const [newEvent , setNewEvent ] = useState({title:"" , startDate:"",endDate:"",startTime:"",endTime:""});
    const [allEvents , setAllEvents ] = useState(events);

    console.log("all",allEvents);

 function handleAddEvent(){
     setAllEvents([...allEvents , newEvent]);
     console.log("new",newEvent)
    }

    function handleInputReset(){
        setNewEvent({title:"" , startDate:"",endDate:""})
    }
   
useEffect(() => {
    handleInputReset();
},[allEvents])

  return (
    <div className='App'>
        <div className='container'>
        <div className='eventManager'>

            </div>
            <div className='calendar'>

                <Calendar  localizer={localizer} events={allEvents} startAccessor="startDate" endAccessor="endDate" />
            </div> 
        </div>
    </div>
  )
}

export default Calendar2;