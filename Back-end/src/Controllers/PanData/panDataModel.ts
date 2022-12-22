import {Pan} from "../../models/pan/pan";

export default class PanDataModel {

	async get(data) {
		try {
			const filter = data.identificador?{identificador: data.identificador} : {};
			const pan = await Pan.find(filter);

			if (pan.length !== 0) {
				return ({pan: pan, res: 200, error: ""});
			}
			return ({pan: "", res: 404, error: "pan no encontrada"});
			
		} catch (error) {
			return ({pan: "", res: 500, error: error});
		}
	}

	async post(data) {
		try {
			const pan = new Pan(data.body);

			await pan.save();
			return({error: "", res: 201});
			
		} catch(error) {
			return({error: error, res: 400});
		}
	}

	async delete(data) {
		if (!data.identificador) {
			return ({error: "Hace falta el identificador", res: 400});
		}
		try {
			const pan = await Pan.findOneAndDelete({identificador: data.identificador});
	
			if (!pan) {
				return ({error: "identificador no encontrado", res: 404});
			}
	
			return ({error: "", res: 200});
		} catch (error) {
			return ({error: error, res: 400});
		}
	}

	async patch(data, change) {
		if (!data.identificador) {
			return ({error: "Hace falta el identificador", res: 400});
		}
	
		const allowedUpdates = ['tipo', 'nombre', 'precio', 'vendedor', 'descripcion','ingredientes', 'image'];
		const actualUpdates = Object.keys(change.body);
		const isValidUpdate =
			actualUpdates.every((update) => allowedUpdates.includes(update));
	
		if (!isValidUpdate) {
			return ({error: "Actualización invalida", res: 400});
		}

		try {
			const pan =
			await Pan.findOneAndUpdate({identificador: data.identificador}, data.body, {
				new: true,
				runValidators: true,
			});
	
			if (!pan) {
				return ({error: "identificador no encontrado", res: 404});
			}
	
			return ({error: "", res: 200});
		} catch (error) {
			return ({error: error, res: 400});
		}
	}
}