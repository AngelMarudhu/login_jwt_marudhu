import React, { useEffect, useState } from "react";
import avatar from "./assets/avatar.png";
import "./css/formStyles.css";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { generateOTP, verifyOTP } from "../axios/userAxios";

const Recovery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState({});
  const { user } = useSelector((state) => state.users);
  const { data } = useSelector((state) => state.users);
  const [local, setLocal] = useState();
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (data.username && hasRendered) {
      dispatch(generateOTP(data.username));
      setLocal(data.username);
    } else {
      setHasRendered(true);
    }
  }, [dispatch, data.username, hasRendered]);

  // console.log(local);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      verifyOTP({ username: user.username || local, code: otp.otp })
    );
    await toast.success("verfied successfully");
    console.log(response);
    if (response.payload) {
      navigate("/reset");
    } else {
      toast.error("invalid otp");
    }
    // navigate('/reset');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtp({ ...otp, [name]: value });
  };

  // const username = JSON.parse(localStorage.getItem('username'));
  // console.log(username);
  // When you resent the OTP, use the retrieved username value
  // e.preventDefault(); is genereal you can use wherever you page is refresh
  const resentOTP = async (e) => {
    e.preventDefault();
    if (local) {
      await Promise.resolve(dispatch(generateOTP(local)));
      toast.success("otp sent successfully");
    } else {
      toast.error("our server seems to busy try again later buddyz");
    }
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
              <span>OTP has been sent to your email</span>
              <input
                type="text"
                name="otp"
                onChange={handleChange}
                placeholder="Enter OTP"
              />
              <button onClick={handleSubmit} className="forms-input-button">
                Submit
              </button>
            </div>
            <div className="forms-span">
              <span>
                Can't Get OTP
                <button onClick={resentOTP}>Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Recovery;
