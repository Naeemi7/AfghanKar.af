const personalDetails = (showPassword) => {
  return [
    {
      labelName: "Firstname",
      type: "text",
      name: "firstName",
      placeholder: "Enter your firstname",
      required: true,
    },
    {
      labelName: "Lastname",
      type: "text",
      name: "lastName",
      placeholder: "Enter your lastname",
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
      labelName: "Position",
      type: "text",
      name: "position",
      placeholder: "e.g. IT Manager",
      required: true,
    },
    {
      labelName: "Mobile",
      type: "tel",
      name: "mobile",
      placeholder: "+93 000000000",
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
};
export default personalDetails;
