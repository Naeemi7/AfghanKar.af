const formFields = (showPassword) => [
  {
    labelName: "Full Name *",
    type: "text",
    name: "fullName",
    placeholder: "Enter your full name",
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
    labelName: "Email *",
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
    labelName: "Confirm password *",
    type: showPassword ? "text" : "password",
    name: "confirm-password",
    placeholder: "Confirm your password",
    required: true,
  },
];

export default formFields;
