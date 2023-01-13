import { Document, Schema, model } from "mongoose";

export interface direccionInterfaz extends Document {
  correo: string;
  calle: string;
  numero: string;
  codigoPostal: string;
  provincia: string;
  pais: string;
}

const direccionSchema = new Schema<direccionInterfaz>({
  correo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
    lowercase: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  calle: {
    type: String,
    required: true,
  },
  numero: {
    type: String,
    required: true,
    match: /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/, 
  },
  codigoPostal: {
    type: String,
    required: true,
    match: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
  },
  provincia: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    },
  pais: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
});

export const Direccion = model<direccionInterfaz>("Direccion", direccionSchema);
