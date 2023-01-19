import { Document, Schema, model } from "mongoose";

export interface tarjetaInterface {
  marca: string;
  cvv: string;
  numero: string;
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
    maxlength: 50,
    lowercase: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  tarjetas: {
    type: [{marca: String, cvv: String, numero: String, caducidad: String}],
    validate: (array: tarjetaInterface[]) => (
      array.forEach(element => {
        if (element.marca.length < 1 || element.marca.length > 20)
          throw Error("La marca no es correcta")
        if (!element.cvv.match(/^[0-9]{3,4}$/)) 
          throw Error("El valor del CVV es erroneo")
        if (!element.numero.match(/^4[0-9]{12}(?:[0-9]{3})?$/)) 
          throw Error("El valor del número es erroneo")
        if (!element.caducidad.match(/^[0-9]{3,4}$/)) 
          throw Error("El valor de caducidad es erroneo")
      })
    ),
  },
});

export const Cartera = model<carteraInterfaz>("Cartera", carteraSchema);
