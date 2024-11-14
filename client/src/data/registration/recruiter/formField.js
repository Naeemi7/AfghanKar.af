const formFields = {
  textField: (label, name, placeholder, required = true) => ({
    labelName: label,
    type: "text",
    name,
    placeholder,
    required,
  }),

  selectField: (label, name, options, placeholder, required = true) => ({
    labelName: label,
    type: "select",
    name,
    options,
    placeholder,
    required,
  }),

  dateField: (label, name, placeholder, required = true) => ({
    labelName: label,
    type: "date",
    name,
    placeholder,
    required,
  }),

  emailField: (label, name, placeholder, required = true) => ({
    labelName: label,
    type: "email",
    name,
    placeholder,
    required,
  }),

  telField: (label, name, placeholder, required = true) => ({
    labelName: label,
    type: "tel",
    name,
    placeholder,
    required,
  }),

  passwordField: (label, name, type, placeholder, required = true) => ({
    labelName: label,
    type,
    name,
    placeholder,
    required,
  }),

  textareaField: (label, name, placeholder, required = true) => ({
    labelName: label,
    type: "textarea",
    name,
    placeholder,
    required,
  }),
};

export default formFields;
