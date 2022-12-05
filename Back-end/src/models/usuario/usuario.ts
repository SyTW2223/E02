import { Document, Schema, model } from "mongoose";

export interface usuarioInterfaz extends Document {
  nombre: string;
  apellidos: string;
  password: string;
  correo: string;
  foto?: Buffer;
}

const usuarioSchema = new Schema<usuarioInterfaz>({
  nombre: {
    type: String,
    trim: true,
    maxlength: 50,
    minlength: 4,
    match: /^[a-zA-Z\s]*$/,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  },
  apellidos: {
    type: String,
    trim: true,
    minlength: 4,
    maxlength: 50,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
    lowercase: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  foto: {
    type: Buffer,
  },
});

export const Usuario = model<usuarioInterfaz>("Usuario", usuarioSchema);
