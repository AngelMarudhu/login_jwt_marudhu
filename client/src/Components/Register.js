import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "./assets/avatar.png";
import "./css/formStyles.css";
import { toast, Toaster } from "react-hot-toast";
import { registrationValidate } from "./Helper";
import { useDispatch } from "react-redux";
import { registerApi } from "../axios/userAxios.js";

const Register = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onUpload = (e) => {
    const { name } = e.target;
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event) => {
        setFormData({ ...formData, [name]: event.target.result });
      };
    }
  };

  const handleChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    // console.log(name, value);
    //In other words, the [name] syntax allows you to dynamically set the name of the property that you want to update, based on the value of the name variable.
    // without spread operator that value only assign last property i mean confirmPassword
    // ... SPREAD OPERATOR EXPLANATION const [person, setPerson] = useState({ name: '', age: '', email: '' });
    // If you want to update only the age property, you can create a new object with the updated age property and spread the existing properties like this:
    // setPerson({ ...person, age: 25 });
    // This will create a new object with the existing name and email properties, and update the age property to 25, WITHOUT LOSING ANY EXISTING DATA
    // in simple terms lucky to persist our existing data
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const datas = await registrationValidate({ ...formData });
    console.log(datas);
    if (Object.keys(datas).length === 0) {
      let dispatching = await dispatch(registerApi(formData));
      console.log(dispatching);
      if (dispatching.payload.result) {
        await toast.success("Registerd Successfully");
        navigate("/");
      }
    } else {
      await Promise.reject(toast.error("coudn't register"));
    }
  };

  return (
    <div className="register">
      <div className="users-family">
        <div className="users-header">
          <h3>Hi Buddyz!</h3>
          <div className="forms-img">
            <input
              type="file"
              id="profile"
              name="profile"
              onChange={onUpload}
            />

            <label htmlFor="profile">
              <img
                src={formData.profile || avatar}
                alt="avatar"
                style={{ cursor: "pointer" }}
              />
            </label>
          </div>
        </div>

        <div className="forms">
          <form className="forms-form">
            <div className="forms-input-and-button">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="UserName"
                name="username"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <button onClick={handleSubmit} className="forms-input-button">
                Submit
              </button>
            </div>
            <div className="forms-span">
              <span>
                Already User?<Link to="/"> LogIn</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
