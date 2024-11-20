import { Schema } from "mongoose";

const addressSchema = new Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
});

export default addressSchema;
