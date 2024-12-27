import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "./assets/avatar.png";
import "./css/formStyles.css";
import { toast, Toaster } from "react-hot-toast";
import { userNameValidate } from "./Helper.js";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authenticate } from "../axios/userAxios";
import { setUser } from "./Redux/userSlice";

const UserName = () => {
  // * Firstly, passing the username and password as an object allows us to easily access and manipulate the values. This is especially useful when we have multiple form fields and need to pass them as an object.
  // * Secondly, passing the values as an object allows us to easily add or remove properties from the object if needed in the future. For example, if we want to add an email field to the login form, we can simply add a new property to the object.
  // * Lastly, passing the username and password as an object allows us to destructure the object and extract the values easily in the function. This makes the code cleaner and more readable.
  const [userName, setUserName] = useState({}); /// here it is the object we can easily add some field in future
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userName);
    const datas = await userNameValidate({ ...userName });
    // console.log(datas, 'datassssss');
    // The if statement with the condition if (!datas?.length) checks if the length of datas is falsy, which means that either datas is null or undefined or it has a length of zero. If this condition is true, it means that datas is either empty or has not been defined yet, so the code inside the if block will execute.
    if (!datas?.length) {
      try {
        const response = await Promise.resolve(
          dispatch(authenticate({ ...userName }))
        );
        console.log(response.payload);
        if (response.payload === 200) {
          /// 200 means we got payload from backend that's the status code 200
          await Promise.resolve(dispatch(setUser(userName.username)));
        } else {
          return toast.error(response.payload.error);
        }

        navigate("/password");
      } catch (error) {
        toast.error("user not ");
      }
    }
    clear();
  };

  const clear = () => {
    setUserName({});
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
                type="text"
                placeholder="UserName"
                onChange={(e) => setUserName({ username: e.target.value })}
              />
              <button onClick={handleSubmit} className="forms-input-button">
                Submit
              </button>
            </div>
            <div className="forms-span">
              <span>
                Not A Member?
                <Link to="/register"> Register</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UserName;
