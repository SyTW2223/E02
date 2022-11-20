import {Document, Schema, model} from 'mongoose';

interface usuarioInterfaz extends Document {
  nombre: string,
  apellidos: string,
  correo: string,
  foto?: Buffer
}

const usuarioSchema = new Schema<usuarioInterfaz>({
  nombre: {
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