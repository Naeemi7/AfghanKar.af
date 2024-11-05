// models/Recruiter.js
import { Schema, model } from "mongoose";
import addressSchema from "./Address.js";
import companySchema from "./Company.js";

const recruiterSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    username: { type: String, required: true, unique: true },
    phoneNumber: { type: String, match: /^\+?[1-9]\d{1,14}$/, required: true },
    position: { type: String, required: true },

    // Subschemas for company details and address
    companyDetails: companySchema,
    address: addressSchema,
  },
  {
    timestamps: true,
  }
);

const Recruiter = model("Recruiter", recruiterSchema);

export default Recruiter;
