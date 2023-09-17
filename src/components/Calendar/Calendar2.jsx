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
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const Calendar2 = () => {
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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
            desc: d?.desc,
            location: d?.location,
            longTime: d?.longTime,
            ownEmail: d?.email,
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
            onSelectEvent={async (event) => {
              console.log(event);
              const ownUserD = await fetch(
                `http://localhost:4000/users/${event.ownEmail}`
              );
              const ownUser = await ownUserD.json();

              const userD = await fetch(
                `http://localhost:4000/users/${event.email}`
              );
              const user = await userD.json();

              setEventDetails({
                eventName: event.eventName,
                location: event.location,
                startTime: event.startDate,
                endTime: event.endDate,
                longTime: event.longTime,
                note: event.desc,
                ownName: ownUser.displayName,
                username: user.displayName,
              });

              onOpen();
            }}
            style={{
              minWidth: "90%",
            }}
          />
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            isCentered
            size={"lg"}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Event details</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text fontSize="lg" mb={1}>
                  Event name :{" "}
                  <span
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {eventDetails?.eventName}
                  </span>
                </Text>
                <Text fontSize="lg" mb={1}>
                  Room master :{" "}
                  <span
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {eventDetails?.ownName}
                  </span>
                </Text>
                <Text fontSize="lg" mb={1}>
                  Partner :{" "}
                  <span
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {eventDetails?.username}
                  </span>
                </Text>
                <Text fontSize="lg" mb={1}>
                  Location :{" "}
                  <span
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {eventDetails?.location}
                  </span>
                </Text>
                <Text fontSize="lg" mb={1}>
                  Start time :{" "}
                  <span
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {eventDetails?.startTime?.toLocaleString()}
                  </span>
                </Text>
                <Text fontSize="lg" mb={1}>
                  End time :{" "}
                  <span
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {eventDetails?.endTime?.toLocaleString()}
                  </span>
                </Text>
                <Text fontSize="lg" mb={1}>
                  Long time :{" "}
                  <span
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {eventDetails?.longTime} mimutes
                  </span>
                </Text>
                <Text fontSize="lg" mb={1}>
                  Note :{" "}
                  <span
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {eventDetails?.note}
                  </span>
                </Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Calendar2;
