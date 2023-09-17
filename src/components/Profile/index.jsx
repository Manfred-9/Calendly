import { Button, FormLabel, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { auth } from "../../firebase/Firebase";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const toast = useToast();
  const [username, setUsername] = useState(auth?.currentUser?.displayName);
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSave = () => {
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        toast({
          title: "Save username successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-center",
        });
      })
      .catch(() => {});
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <FormLabel>Username</FormLabel>
      <Input
        onChange={handleChange}
        value={username}
        type="text"
        isRequired
        name="username"
      />
      <Button
        color={"white"}
        rounded={"lg"}
        mt={10}
        bg={"blue.500"}
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
};

export default Profile;
