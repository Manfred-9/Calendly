import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar2.css";
import "date-fns/locale/en-US";

const locales = {
  "en-US": "date-fns/locale/en-US",
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "abc",
    startDate: new Date("2023-09-7"),
    endDate: new Date("2023-09-8"),
  },
];

import { collection, getDocs } from "firebase/firestore";

import { auth, db } from "../../firebase/Firebase.js";
import toDateTime from "../../utils/date";

const Calendar2 = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const dataFilter = data.filter(
        (d) => d?.email === auth.currentUser.email && d?.schedules?.length > 0
      );

      const dataEvents = [];
      for (let d of dataFilter) {
        d?.schedules.forEach((s) => {
          dataEvents.push({
            eventName: d.eventName,
            ...s,
            startDate: toDateTime(s.startDate.seconds),
            endDate: toDateTime(s.endDate.seconds),
            title: d.eventName,
          });
        });
      }
      setEvents(dataEvents);
    })();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div
          className="calendar"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="startDate"
            endAccessor="endDate"
            style={{
              minWidth: "90%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar2;
