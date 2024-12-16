const contactData = [
  {
    labelName: "Full Name *",
    type: "text",
    name: "fullName",
    placeholder: "e.g., John Doe",
    required: true,
  },
  {
    labelName: "Email *",
    type: "email",
    name: "email",
    placeholder: "e.g., john.deo@example..com",
    required: true,
  },
  {
    labelName: "Your Message *",
    type: "textarea",
    name: "message",
    placeholder: "Let us know how we can assist you.",
    required: true,
  },
];

const contactInfo = [
  {
    library: "md",
    name: "MdAlternateEmail",
    labelName: "info@afghanKar.af",
  },
  {
    library: "md",
    name: "MdPhoneInTalk",
    labelName: "+93-790173480",
  },
  {
    library: "io5",
    name: "IoLocationOutline",
    labelName: "New City, Kabul, Afghanistan",
  },
];

export { contactData, contactInfo };
