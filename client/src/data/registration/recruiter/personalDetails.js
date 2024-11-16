import formFields from "./formField";

const personalDetails = (showPassword) => [
  formFields.textField("Firstname *", "firstName", "Enter your firstname"),
  formFields.textField("Lastname *", "lastName", "Enter your lastname"),
  formFields.emailField("Email *", "email", "Enter your email"),
  formFields.textField("Position *", "position", "e.g. IT Manager"),
  formFields.telField("Mobile *", "mobile", "+93 000000000"),
  formFields.passwordField(
    "Password *",
    "password",
    showPassword ? "text" : "password",
    "Enter your password"
  ),
  formFields.passwordField(
    "Confirm Password *",
    "confirm-password",
    showPassword ? "text" : "password",
    "Confirm your password"
  ),
];

export default personalDetails;
