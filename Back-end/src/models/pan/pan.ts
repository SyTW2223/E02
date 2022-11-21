import {Document, Schema, model} from 'mongoose';

interface panInterfaz extends Document {
	identificador: number,
	tipo: string,
	nombre: string,
	precio: number,
	vendedor: string,
	image: Buffer
}

const panSchema = new Schema<panInterfaz>({
	identificador: {
		type: Number,
		required: true,
		unique: true
	},
	tipo: {
		type: String,
    required: true,
    trim: true
	},
	nombre: {
		type: String,
    required: true
	},
	precio: {
		type: Number,
		required: true
	},
	vendedor: {
		type: String,
    required: true
	},
	image: {
		type: Buffer,
		required: true
	}
});

export const Pan = model<panInterfaz>("Pan", panSchema);