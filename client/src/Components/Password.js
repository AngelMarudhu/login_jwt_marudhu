import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import avatar from "./assets/avatar.png";
import "./css/formStyles.css";
import { toast, Toaster } from "react-hot-toast";
import { passwordValidate } from "./Helper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserDetails, loginApi } from "../axios/userAxios";
import { useLocation, useNavigate } from "react-router-dom";

const Password = () => {
  const [password, setPassword] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const { data } = useSelector((state) => state.users);
  // const { isAuthenticated } = useSelector((state) => state.users);

  // console.log(isAuthenticated);

  useEffect(() => {
    // What i means this code user.username is greater than 0 only do dispatch event if user.username length is 0 or null and undefined the page will navigate to username field page
    // when you refresh the password page automatically username length going to 0 so your page move on to home
    if (!user.username?.length) {
      navigate("/");
    } else {
      dispatch(getUserDetails(user.username));
    }
  }, [location, dispatch, user.username, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password);
    const datas = await passwordValidate({ ...password });
    if (!datas?.length) {
      const response = await Promise.resolve(
        dispatch(loginApi({ username: user.username, password: password.pass }))
      );
      console.log(response);
      if (response.payload.message) {
        toast.error("your password is incorrect");
      } else {
        await Promise.resolve(toast.success("logged in")).then((res) => {
          if (res > 0) {
            navigate("/profile");
          }
        });
      }
    } else {
      toast.error("your credentials are incorrect");
    }
  };

  return (
    <div className="users">
      <div className="users-family">
        <div className="users-header">
          <h3>Hi {data?.username}</h3>
          <div className="forms-img">
            <img src={data?.profile || avatar} alt="avatar" />
          </div>
        </div>

        <div className="forms">
          <form className="forms-form">
            <div className="forms-input-and-button">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword({ pass: e.target.value })}
              />
              <button onClick={handleSubmit} className="forms-input-button">
                Submit
              </button>
            </div>
            <div className="forms-span">
              <span>
                Forgot Password?
                <Link to="/recovery"> Recover Now</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Password;
