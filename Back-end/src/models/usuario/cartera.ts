import { Document, Schema, model } from "mongoose";

export interface tarjetaInterface {
  marca: string;
  cvv: number;
  numero: number;
  caducidad: string;
}

export interface carteraInterfaz extends Document {
  correo: string;
  tarjetas: tarjetaInterface[];
}

const carteraSchema = new Schema<carteraInterfaz>({
  correo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  tarjetas: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

export const Cartera = model<carteraInterfaz>("Cartera", carteraSchema);
