const formFields = (showPassword) => [
  {
    labelName: "Firstname",
    type: "text",
    name: "firstname",
    placeholder: "Enter your firstname",
    required: true,
  },
  {
    labelName: "Lastname",
    type: "text",
    name: "lastname",
    placeholder: "Enter your lastname",
    required: true,
  },
  {
    labelName: "Username",
    type: "text",
    name: "username",
    placeholder: "Enter your username",
    required: true,
  },
  {
    labelName: "Email",
    type: "email",
    name: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    labelName: "Password *",
    type: showPassword ? "text" : "password",
    name: "password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    labelName: "Confirm password",
    type: showPassword ? "text" : "password",
    name: "confirm-password",
    placeholder: "Confirm your password",
    required: true,
  },
];

export default formFields;
