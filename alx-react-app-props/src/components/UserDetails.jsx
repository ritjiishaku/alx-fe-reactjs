import React, { useContext } from "react";
import UserContext from "./components/UserContext";

const UserDetails = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserDetails;
