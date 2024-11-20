import { Schema, model } from "mongoose";

const recruiterSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    phoneNumber: { type: String, match: /^\+?[1-9]\d{1,14}$/, required: true },
    position: { type: String, required: true },

    // Company details as a nested object

    companyName: { type: String, required: true },
    companyType: {
      type: String,
      enum: [
        "Private",
        "Public",
        "Non-Profit",
        "Government",
        "Cooperative",
        "Startup",
        "Multinational",
        "Other",
      ],
      required: true,
    },
    foundedIn: { type: Number, min: 1800, max: new Date().getFullYear() },
    companyWebsite: { type: String, match: /^(http|https):\/\/[^ "]+$/ },
    description: { type: String, maxlength: 500 },
    industryType: {
      type: String,
      enum: [
        "IT",
        "Finance",
        "Healthcare",
        "Education",
        "Retail",
        "Manufacturing",
        "Construction",
        "Real Estate",
        "Agriculture",
        "Hospitality",
        "Telecommunication",
        "Other",
      ],
      required: true,
    },
    companyLogo: {
      type: String,
      match: /^(http|https):\/\/[^ "]+$/,
      required: false,
    },

    // Address details as a nested object

    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
  },

  {
    timestamps: true,
  }
);

const Recruiter = model("Recruiter", recruiterSchema);

export default Recruiter;
