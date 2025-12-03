"use client";


import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const handlechange=async()=>{
    await logoutUser();
  }
 
  return (
    <Button variant={"destructive"} onClick={handlechange} >
      Logout
    </Button>
  );
};

export default LogoutButton;
