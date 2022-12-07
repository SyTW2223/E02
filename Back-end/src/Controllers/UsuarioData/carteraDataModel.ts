import {Cartera} from "../../models/usuario/cartera";

export default class CarteraDataModel {

	async get(data) {
		try {
			const filter = data.correo?{correo: data.correo.toString()} : {};
		
			const cartera = await Cartera.find(filter);

			if (cartera.length !== 0) {
				return ({cartera: cartera, res: 200, error: ""});
			}
			
			return ({cartera: "", res: 404, error: "cartera no encontrada"});
			
		} catch (error) {
			return ({cartera: "", res: 500, error: error});
		}
	}

	async post(data) {
		try {
			const cartera = new Cartera(data.body);

			await cartera.save();
			return({error: "", res: 201});
			
		} catch(error) {
			return({error: error, res: 400});
		}
	}

	async delete(data) {
		if (!data.correo) {
			return ({error: "Hace falta el correo", res: 400});
		}
		try {
			const cartera = await Cartera.findOneAndDelete({correo: data.correo.toString()});
	
			if (!cartera) {
				return ({error: "Correo no encontrado", res: 404});
			}
	
			return ({error: "", res: 200});
		} catch (error) {
			return ({error: error, res: 400});
		}
	}

	async patch(data, change) {
		if (!data.correo) {
			return ({error: "Hace falta el correo", res: 400});
		}
	
		const allowedUpdates = ['tarjetas'];
		const actualUpdates = Object.keys(change.body);
		const isValidUpdate =
			actualUpdates.every((update) => allowedUpdates.includes(update));
	
		if (!isValidUpdate) {
			return ({error: "Actualización invalida", res: 400});
		}

		try {
			const cartera =
			await Cartera.findOneAndUpdate({correo: data.correo.toString()}, data.body, {
				new: true,
				runValidators: true,
			});
	
			if (!cartera) {
				return ({error: "Correo no encontrado", res: 404});
			}
	
			return ({error: "", res: 200});
		} catch (error) {
			return ({error: error, res: 400});
		}
	}
}