import {
  Box,
  Button,
  Flex,
  Heading,
  Switch,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth, db } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const EventForm = () => {
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

  const handleAddEvent = async () => {
    const data = {
      ...values,
      ...newEvent,
      users: values.users.map((v) => v.value),
      schedules: [],
      email: auth?.currentUser.email,
    };
    await addDoc(collection(db, "events"), data);
    navigate("/userevent/userhome/created-events");
  };

  return (
    <Box mx={"25rem"} p={4}>
      <Flex justifyContent={"space-between"} my={8}>
        <Heading fontWeight={"normal"}>New Event</Heading>
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
          onChange={(e) =>
            setNewEvent({ ...newEvent, longTime: e.target.value })
          }
        />
        <FormLabel>Location</FormLabel>
        <Input onChange={handleChange} type="text" isRequired name="location" />
        <FormLabel>Description/Instructions</FormLabel>
        <Textarea
          onChange={handleChange}
          type="textBox"
          isRequired
          minHeight={40}
          name="desc"
        />
        <FormLabel>Members email</FormLabel>
        {values.users.map((v) => {
          return (
            <Input
              key={v.name}
              type="text"
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

        <Flex gap={4} my={4} justifyContent={"right"}>
          <Button
            color={"white"}
            rounded={"full"}
            bg={"blue.500"}
            onClick={handleAddEvent}
          >
            Save
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default EventForm;
