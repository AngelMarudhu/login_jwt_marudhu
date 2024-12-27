import React, { useState } from "react";
import avatar from "./assets/avatar.png";
import "./css/formStyles.css";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { recoveryPasswordValidate } from "./Helper";
import { useSelector } from "react-redux";
import { resetPassword } from "../axios/userAxios";
import { useDispatch } from "react-redux";

const Reset = () => {
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const { data } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password.password, data.username);
    const datas = await recoveryPasswordValidate({ ...password });
    if (Object.keys(datas).length === 0) {
      const response = await dispatch(
        resetPassword({ username: data.username, password: password.password })
      );
      console.log(response);
      if (response.payload) {
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    // console.log(e);
    // console.log(password);
    const { name, value } = e.target;
    //In other words, the [name] syntax allows you to dynamically set the name of the property that you want to update, based on the value of the name variable.
    // without spread operator that value only assign last property i mean confirmPassword

    // ... SPREAD OPERATOR EXPLANATION const [person, setPerson] = useState({ name: '', age: '', email: '' });
    // If you want to update only the age property, you can create a new object with the updated age property and spread the existing properties like this:
    // setPerson({ ...person, age: 25 });
    // This will create a new object with the existing name and email properties, and update the age property to 25, WITHOUT LOSING ANY EXISTING DATA
    setPassword({ ...password, [name]: value });
  };

  return (
    <div className="users">
      <div className="users-family">
        <div className="users-header">
          <h3>Hi Buddyz!</h3>
          <div className="forms-img">
            <img src={avatar} alt="avatar" />
          </div>
        </div>

        <div className="forms">
          <form className="forms-form">
            <div className="forms-input-and-button">
              <input
                type="password"
                placeholder="Enter New Password"
                name="password"
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              <button onClick={handleSubmit} className="forms-input-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Reset;
