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
    minlength: 1,
    match: /^[a-zA-Z\s]*$/,
  },
  password: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    trim: true,
    minlength: 1,
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
