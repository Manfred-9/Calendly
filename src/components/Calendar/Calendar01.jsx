import format from "date-fns/format";
import getDay from "date-fns/getDay";
import "date-fns/locale/en-US";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useRef, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import "./Calendar01.css";

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

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import { auth, db } from "../../firebase/Firebase.js";
import { formats, modules } from "../../utils/Editor";
import toDateTime from "../../utils/date";

const Calendar01 = () => {
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState("");
  const lastedVal = useRef("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSaveNote = async () => {
    setIsEdit(false);
    const uid = eventDetails?.uid;
    const eventRef = doc(db, "events", uid);
    const eventSnap = await getDoc(eventRef);
    if (!eventSnap.exists()) {
      return;
    }
    const isOwner = eventDetails.ownEmail === auth.currentUser.email;
    const eventNotes = eventSnap?.data()?.notes || [];
    let existNote = null;

    if (isOwner) {
      existNote = eventNotes?.find(
        (n) =>
          n.email === auth.currentUser.email &&
          n.partnerEmail === eventDetails.partnerEmail
      );
    } else {
      existNote = eventNotes?.find((n) => n.email === auth.currentUser.email);
    }

    // return;
    if (existNote) {
      await setDoc(
        eventRef,
        {
          notes: eventNotes?.map((n) => {
            if (isOwner) {
              if (
                n.email === auth.currentUser.email &&
                n.partnerEmail === eventDetails.partnerEmail
              ) {
                n.note = value;
              }
            } else {
              if (n.email === auth.currentUser.email) {
                n.note = value;
              }
            }

            return n;
          }),
        },
        { merge: true }
      );
    } else {
      const data = {
        email: auth.currentUser.email,
        note: value,
      };
      if (isOwner) {
        data.partnerEmail = eventDetails.partnerEmail;
      }
      await setDoc(
        eventRef,
        {
          notes: [...eventNotes, data],
        },
        { merge: true }
      );
    }
    lastedVal.current = value;
    toast({
      title: "Save successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });
  };

  const handleCloseNote = () => {
    setValue(lastedVal.current);
    setIsEdit(false);
  };

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
        (d) =>
          (d?.email === auth.currentUser.email && d?.schedules?.length > 0) ||
          (d?.schedules?.length > 0 &&
            d?.schedules?.some((s) => s.email === auth.currentUser.email))
      );

      const dataEvents = [];
      for (let d of dataFilter) {
        d?.schedules.forEach((s) => {
          if (d?.email === auth.currentUser.email) {
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
              uid: d?.id,
              note:
                d?.notes?.find((n) => n.email === auth.currentUser.email)
                  ?.note || "",
            });
          } else {
            if (s?.email === auth.currentUser.email) {
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
                uid: d?.id,
                note:
                  d?.notes?.find((n) => n.email === auth.currentUser.email)
                    ?.note || "",
              });
            }
          }
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
              const ownUserD = await fetch(
                `http://localhost:4000/users/${event.ownEmail}`
              );
              const ownUser = await ownUserD.json();

              const userD = await fetch(
                `http://localhost:4000/users/${event.email}`
              );
              const user = await userD.json();

              const uid = event?.uid;
              const eventRef = doc(db, "events", uid);

              const eventSnap = await getDoc(eventRef);
              console.log(eventSnap.data());

              const isOwner = event.ownEmail === auth.currentUser.email;
              const eventNotes = eventSnap?.data()?.notes || [];
              let existNote = null;

              if (isOwner) {
                existNote = eventNotes?.find(
                  (n) =>
                    n.email === auth.currentUser.email &&
                    n.partnerEmail === event.email
                );
              } else {
                existNote = eventNotes?.find(
                  (n) => n.email === auth.currentUser.email
                );
              }

              lastedVal.current = existNote?.note || "";

              setValue(existNote?.note || "");
              setEventDetails({
                eventName: event.eventName,
                location: event.location,
                startTime: event.startDate,
                endTime: event.endDate,
                longTime: event.longTime,
                note: event.desc,
                ownName: ownUser.displayName,
                username: user.displayName,
                uid: event.uid,
                ownEmail: event.ownEmail,
                partnerEmail: event.email,
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
            size={"4xl"}
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
                  Meeting length :{" "}
                  <span
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {eventDetails?.longTime} mimutes
                  </span>
                </Text>
                <Text fontSize="lg" mb={3}>
                  Description :{" "}
                  <span
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {eventDetails?.note}
                  </span>
                </Text>
                <Text fontSize="lg" mb={3}>
                  <span
                    style={{
                      fontWeight: "500",
                      color: "blue  ",
                    }}
                  >
                    YOUR NOTE
                  </span>
                </Text>
                <ReactQuill
                  style={{
                    background: isEdit ? "#fff" : "#f1f1f1",
                    pointerEvents: isEdit ? "unset" : "none",
                  }}
                  onChange={(v) => setValue(v)}
                  value={value}
                  theme="snow"
                  modules={modules}
                  formats={formats}
                ></ReactQuill>
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {!isEdit && (
                    <Button
                      onClick={() => setIsEdit(true)}
                      colorScheme="gray"
                      mr={2}
                    >
                      Edit
                    </Button>
                  )}
                  {isEdit && (
                    <>
                      <Button
                        onClick={handleCloseNote}
                        colorScheme="gray"
                        mr={2}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveNote} colorScheme="blue">
                        Save
                      </Button>
                    </>
                  )}
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Calendar01;
