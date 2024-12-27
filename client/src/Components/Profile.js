import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "./assets/avatar.png";
import "./css/formStyles.css";
import { toast, Toaster } from "react-hot-toast";
import { profileValidation } from "./Helper";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserToken } from "../axios/userAxios";

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  // PROFILE UPDATION BUDDY INTIALLY ALL OF THE INPUT COLOUMS ARE EMPTY STRING WHICH MEANS INITIAL STATE
  const [profile, setProfile] = useState({
    email: "",
    firstname: "",
    lastname: "",
    mobile: "",
    address: "",
    profile: "",
  });
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(user.tokenUsername);
  // console.log(data, 'from profile');

  useEffect(() => {
    dispatch(getUserDetails(user.username));
  }, [dispatch, user.username]);

  const onUpload = (e) => {
    const { name } = e.target;
    console.log(name);
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = (event) => {
        setProfile({ ...profile, [name]: event.target.result });
      };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      setProfile({ ...profile, [name]: parseInt(value) });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profile);
    const datas = await profileValidation({ ...profile });
    if (Object.keys(datas).length === 0) {
      const response = await dispatch(updateUserToken(profile));
      if (response.payload) {
        //// the toast is just you've successfully updated your data
        await toast.success(response.payload.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <div className="register">
      <div className="users-family">
        <div className="users-header">
          <h3>Hi Angel</h3>
          <div className="forms-img">
            <input
              type="file"
              id="profile"
              name="profile"
              onChange={onUpload}
            />

            <label htmlFor="profile">
              <img
                src={profile.profile || avatar}
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
                type="text"
                placeholder="FirstName"
                name="firstname"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="LastName"
                name="lastname"
                onChange={handleChange}
              />

              {/* ========================================================================================================================= */}

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={handleChange}
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                name="mobile"
                pattern="[0-9]{10}"
                onChange={handleChange}
              />

              {/* ========================================================================================================================= */}

              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={handleChange}
              />
              <button onClick={handleSubmit} className="forms-input-button">
                Update
              </button>
            </div>
            <div className="forms-span">
              <span>
                Thanks For Joining Buddy
                <Link to="/" onClick={handleLogout}>
                  {" "}
                  Logout{" "}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Profile;
