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
    id: 1,
    library: "md",
    iconName: "MdAlternateEmail",
    labelName: "info@afghanKar.af",
  },
  {
    id: 2,
    library: "md",
    iconName: "MdPhoneInTalk",
    labelName: "+93-790173480",
  },
  {
    id: 3,
    library: "io5",
    iconName: "IoLocationOutline",
    labelName: "New City, Kabul, Afghanistan",
  },
];

export { contactData, contactInfo };
