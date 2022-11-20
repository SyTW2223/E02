import {Document, Schema, model} from 'mongoose';

interface tarjetaInterface {
  marca: string,
  cvv: number,
  numero: number,
  caducidad: string
}

interface carteraInterfaz extends Document {
  correo: string,
  tarjetas: tarjetaInterface[]
}

const carteraSchema = new Schema<carteraInterfaz>({
  correo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  tarjetas: {
    type: Schema.Types.Mixed,
    required: true, 
  }
});

export const Cartera = model<carteraInterfaz>("Cartera", carteraSchema);