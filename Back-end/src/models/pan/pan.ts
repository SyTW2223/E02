import { Document, Schema, model } from "mongoose";

export interface panInterfaz extends Document {
  identificador: number;
  tipo: string;
  nombre: string;
  precio: number;
  vendedor: string;
  descripcion: string
  ingredientes: string;
  image: Buffer;
}

const panSchema = new Schema<panInterfaz>({
  identificador: {
    type: Number,
    required: true,
    unique: true,
  },
  tipo: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
    match: /^[a-zA-Z\s]*$/,
  },
  nombre: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]*$/,
    minlength: 1,
    maxlength: 50,
  },
  precio: {
    type: Number,
    required: true,
  },
  vendedor: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]*$/,
    minlength: 1,
    maxlength: 50,
  },
  descripcion: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  ingredientes: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  image: {
    type: Buffer,
    required: true,
  },
});

export const Pan = model<panInterfaz>("Pan", panSchema);
