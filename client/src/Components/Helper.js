import toast from "react-hot-toast";

// THIS IS CALLED HIGER ORDER FUNCITONS......AND COMPONENTS IMPLEMENTING STAGE
export async function userNameValidate({ username }) {
  const errors = validateUsername({}, username);
  return errors;
}

export async function passwordValidate({ pass }) {
  const errors = validatePassword({}, pass);
  return errors;
}

export async function recoveryPasswordValidate({ password, confirmPassword }) {
  // console.log(password, confirmPassword, 'helpeer');
  const errors = validateRecoveryPassword({}, { password, confirmPassword });
  return errors;
}

export async function registrationValidate({
  email,
  username,
  password,
  profile,
}) {
  const errors = validateRegistration(
    {},
    { email, username, password, profile }
  );
  console.log(email, username, password, profile);
  return errors;
}

export async function profileValidation({
  firstname,
  lastname,
  email,
  mobile,
}) {
  console.log({ firstname, lastname, email, mobile });
  const errors = validateProfile({}, { firstname, lastname, email, mobile });
  return errors;
}

const validateUsername = (errors = {}, username) => {
  //   console.log(name);
  if (!username) {
    errors.message = toast.error("please provide a username");
  } else if (username.includes(" ")) {
    errors.message = toast.error("please provide valid username");
  }
  return errors;
};

const validatePassword = (errors = {}, password) => {
  const specialCharacters = /[-!$%^&*!@#()_+|~=`{}\[\]:";'<>?,.\/]/;

  if (!password) {
    errors.message = toast.error("please provide a password");
  } else if (password.includes(" ")) {
    errors.message = toast.error("please provide valid password");
  } else if (password.length < 4) {
    errors.message = toast.error("minimum 5 digit required");
    // !means neenga specialChracter @ podalana elseif la value true va maarum error varum neenga specialChracter @ pottingana else if true ah marum error varadhu
  } else if (!specialCharacters.test(password)) {
    errors.message = toast.error("please add one special character ");
  }
  return errors;
};

const validateRecoveryPassword = (
  errors = {},
  { password, confirmPassword }
) => {
  if (!password || !confirmPassword) {
    errors.message = toast.error("please enter password");
  } else if (password !== confirmPassword) {
    errors.message = toast.error("Your Password is Mismatching");
  }
  return errors;
};

const validateRegistration = (
  errors = {},
  { email, username, password, profile }
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /[-!$%^&*!@#()_+|~=`{}\[\]:";'<>?,.\/]/;

  if (!email || !username || !password || !profile) {
    errors.message = toast.error("please fill the all inputs");
  } else if (!emailRegex.test(email)) {
    errors.message = toast.error("please enter valid email");
  } else if (!passwordRegex.test(password)) {
    errors.message = toast.error("please enter valid password");
  } else if (password.length < 4) {
    errors.message = toast.error("minimum 5 digit required");
  }
  return errors;
};

const validateProfile = (
  errors = {},
  { firstname, lastname, email, mobile }
) => {
  // console.log({ firstname, lastname, email });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isNumber = /^\d+$/;

  if (!firstname || !lastname || !email) {
    errors.message = toast.error("please enter inputs");
  } else if (firstname.length < 4) {
    errors.message = toast.error("please enter  valid firstname");
  }
  if (!emailRegex.test(email)) {
    errors.message = toast.error("please provide valid email");
  }
  if (!isNumber.test(mobile)) {
    errors.message = toast.error("please provide valid phone number");
  }
  return errors;
};
