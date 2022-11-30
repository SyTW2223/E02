import {Document, Schema, model} from 'mongoose';

export interface usuarioInterfaz extends Document {
  nombre: string,
  apellidos: string,
  password: string,
  correo: string,
  foto?: Buffer
}

const usuarioSchema = new Schema<usuarioInterfaz>({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  apellidos: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  foto: {
    type: Buffer
  },
});

export const Usuario = model<usuarioInterfaz>("Usuario", usuarioSchema);