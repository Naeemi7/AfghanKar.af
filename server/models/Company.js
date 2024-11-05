import { Schema } from "mongoose";

const companySchema = new Schema(
  {
    companyName: { type: String, required: true },
    companyType: {
      type: String,
      enum: ["Private", "Public", "Non-Profit", "Government", "Other"],
      required: true,
    },
    foundedIn: { type: Number, min: 1800, max: new Date().getFullYear() },
    companyWebsite: { type: String, match: /^(http|https):\/\/[^ "]+$/ }, // Basic URL validation
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
        "Other",
      ],
      required: true,
    },
    companyLogo: {
      type: String,
      match: /^(http|https):\/\/[^ "]+$/, // URL validation to ensure the logo is a valid link
      required: false, // Not required if a company doesn’t have a logo
    },
  },
  { _id: false }
); // Prevents creation of a new ObjectId for the subdocument

export default companySchema;
