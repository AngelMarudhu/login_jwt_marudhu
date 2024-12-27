import React, { useState } from "react";
import Password from "./Password";
import UserName from "./UserName";

const Login = () => {
  const [userName, setUserName] = useState({});
  const [password, setPassword] = useState({});

  console.log(userName, password);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserName setUserName={setUserName} />
      <Password setPassword={setPassword} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
