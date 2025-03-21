import { Schema, model } from "mongoose";

const recruiterSchema = new Schema(
  {
    // Personal Details
    personalDetails: {
      fullName: { type: String, required: true, trim: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true, minlength: 8 },
      phoneNumber: { type: String, required: true, trim: true },
      position: { type: String, required: true, trim: true },
    },

    // Company Details
    companyDetails: {
      companyName: { type: String, required: true, trim: true },
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
      foundedIn: {
        type: Date,
        validate: {
          validator: (value) =>
            value.getFullYear() >= 1800 &&
            value.getFullYear() <= new Date().getFullYear(),
          message: "Founded year must be between 1800 and the current year.",
        },
      },
      website: {
        type: String,
        match: /^(https?:\/\/[^\s/$.?#].[^\s]*)$/,
        trim: true,
      },
      description: { type: String, maxlength: 500, trim: true },
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
        match: /^(https?:\/\/[^\s/$.?#].[^\s]*)$/,
        trim: true,
      },
    },

    // Address Details
    addressDetails: {
      country: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      street: { type: String, required: true, trim: true },
    },
  },
  { timestamps: true }
);

// Create the Recruiter model based on the schema
const Recruiter = model("Recruiter", recruiterSchema);

export default Recruiter;
