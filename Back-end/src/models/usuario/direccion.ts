import {Document, Schema, model} from 'mongoose';

interface direccionInterfaz extends Document {
	correo: string,
  calle: string,
  numero: number,
  codigoPostal: number,
  provincia: string,
  pais: string
}

const direccionSchema = new Schema<direccionInterfaz>({
	correo: {
		type: String,
		unique: true
	},
	calle: {
		type: String,
    required: true
	},
	numero: {
		type: Number,
		required: true
	},
	codigoPostal: {
		type: Number,
		required: true
	},
	provincia: {
		type: String,
    required: true
	},
	pais: {
		type: String,
    required: true
	}
});

export const Direccion = model<direccionInterfaz>("Direccion", direccionSchema);