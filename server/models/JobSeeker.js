import { Schema, model } from "mongoose";
import addressSchema from "./Address.js";

const jobSeekerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    phoneNumber: { type: String, match: /^\+?[1-9]\d{1,14}$/ },

    // Professional Details
    resume: { type: String }, // URL to resume file if stored online
    skills: [{ type: String }], // Array of skills as strings
    experience: {
      years: { type: Number, min: 0 },
      description: { type: String, maxlength: 500 },
    },

    // Reuse address schema
    address: addressSchema,
  },
  {
    timestamps: true,
  }
);

const JobSeeker = model("JobSeeker", jobSeekerSchema);

export default JobSeeker;
