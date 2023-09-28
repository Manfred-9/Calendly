import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../firebase/Firebase";
import toDateTime from "../../utils/date";

const EventUpdate = () => {
  const { id } = useParams();
  const toast = useToast();
  const [values, setValues] = useState({
    eventName: "",
    location: "",
    desc: "",
    users: [
      {
        name: 1,
        value: "",
      },
    ],
  });

  const [newEvent, setNewEvent] = useState({
    startDate: "",
    endDate: "",
    longTime: "",
  });

  // console.log(newEvent.longTime);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeUsers = (e, name) => {
    setValues({
      ...values,
      users: values.users.map((i) => {
        if (i.name.toString() === `${name}`) {
          i.value = e.target.value;
        }
        return i;
      }),
    });
  };

  const handleAddInput = () => {
    setValues({
      ...values,
      users: [
        ...values.users,
        {
          name: values.users.length + 1,
          value: "",
        },
      ],
    });
  };

  const handleUpdateEvent = async () => {
    const data = {
      ...values,
      ...newEvent,
      users: values.users.map((v) => v.value),
      schedules: [],
      email: auth?.currentUser.email,
    };
    await setDoc(doc(db, "events", id), data, {
      merge: true,
    });
    toast({
      title: "Update successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });
    navigate("/userevent/userhome/created-events");
  };

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "events", id);
      const docSnap = await getDoc(docRef);
      const {
        endDate,
        startDate,
        location,
        maxParticipants,
        schedules,
        email,
        desc,
        users,
        longTime,
        eventName,
      } = docSnap.data();

      setValues({
        eventName,
        desc,
        maxParticipants,
        users: users?.map((m, idx) => ({
          name: idx + 1,
          value: m,
        })),
        location,
      });

      setNewEvent({
        longTime,
        startDate: toDateTime(startDate.seconds),
        endDate: toDateTime(endDate.seconds),
      });
    })();
  }, []);

  return (
    <Box mx={"25rem"} p={4}>
      <Flex justifyContent={"space-between"} my={8}>
        <Heading fontWeight={"normal"}>Update Event</Heading>
        {<Flex gap={2}></Flex>}
      </Flex>
      <hr />
      <FormControl border={"1px solid"} p={8}>
        <hr />

        <FormLabel>Event Name</FormLabel>
        <Input
          onChange={handleChange}
          type="text"
          isRequired
          value={values.eventName}
          name="eventName"
        />

        <FormLabel>Time</FormLabel>
        <DatePicker
          showTimeSelect
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          className="time-input"
          placeholderText="Start Date"
          selected={newEvent.startDate}
          onChange={(startDate) => setNewEvent({ ...newEvent, startDate })}
        />
        <DatePicker
          className="time-input"
          showTimeSelect
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="End Date"
          selected={newEvent.endDate}
          onChange={(endDate) => setNewEvent({ ...newEvent, endDate })}
        />

        <FormLabel>Meeting length</FormLabel>
        <input
          className="time-input"
          style={{ marginBottom: 0 }}
          type="number"
          placeholder="E.g.,15min, 30min, 45min"
          value={newEvent.longTime}
          onChange={(e) => {
            // console.log(e.target.value);
            setNewEvent({ ...newEvent, longTime: e.target.value });
          }}
        />
        <FormLabel>Location</FormLabel>
        <Input
          onChange={handleChange}
          type="text"
          value={values.location}
          isRequired
          name="location"
        />
        <FormLabel>Description/Instructions</FormLabel>
        <Textarea
          onChange={handleChange}
          type="textBox"
          isRequired
          value={values.desc}
          minHeight={40}
          name="desc"
        />
        <FormLabel>Max Participants</FormLabel>
        <Input
          type="number"
          isRequired
          name="maxParticipants"
          value={values.maxParticipants}
          onChange={(e) =>
            setNewEvent({ ...newEvent, maxParticipants: e.target.value })
          }
        />

        <FormLabel>Members email</FormLabel>
        {values.users.map((v) => {
          return (
            <Input
              key={v.name}
              type="text"
              value={v.value}
              onChange={(e) => handleChangeUsers(e, v.name)}
              style={{
                marginBottom: 10,
              }}
              isRequired
              name={v.name}
            />
          );
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 40,
              height: 36,
              borderRadius: 5,
              backgroundColor: "blue",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleAddInput}
          >
            <b
              style={{
                fontSize: 24,
                color: "white",
                marginBottom: 5,
              }}
            >
              +
            </b>
          </div>
        </div>
        <hr />

        <Flex gap={4} my={4} justifyContent={"center"}>
          <Button
            color={"white"}
            rounded={"xl"}
            bg={"blue.600"}
            onClick={handleUpdateEvent}
          >
            Update
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default EventUpdate;
