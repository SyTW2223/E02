import {Direccion} from "../../models/usuario/direccion";

export default class direccionDataModel {

	async get(data) {
		try {
			const filter = data.query.correo?{correo: data.query.correo.toString()} : {};
			const direccion = await Direccion.find(filter);

			if (direccion.length !== 0) {
				return ({direccion: direccion, res: 200, error: ""});
			}
			return ({direccion: "", res: 404, error: "direccion no encontrada"});
			
		} catch (error) {
			return ({direccion: "", res: 500, error: error});
		}
	}

	async post(data) {
		try {
			const direccion = new Direccion(data.body);

			await direccion.save();
			return({error: "", res: 201});
			
		} catch(error) {
			return({error: error, res: 400});
		}
	}

	async delete(data) {
		if (!data.query.correo) {
			return ({error: "Hace falta el correo", res: 400});
		}
		try {
			const direccion = await Direccion.findOneAndDelete({correo: data.query.correo.toString()});
	
			if (!direccion) {
				return ({error: "Correo no encontrado", res: 404});
			}
	
			return ({error: "", res: 200});
		} catch (error) {
			return ({error: error, res: 400});
		}
	}

	async patch(data) {
		if (!data.query.correo) {
			return ({error: "Hace falta el correo", res: 400});
		}
	
		const allowedUpdates = ['calle', 'numero', 'codigoPostal', 'provincia', 'pais'];
		const actualUpdates = Object.keys(data.body);
		const isValidUpdate =
			actualUpdates.every((update) => allowedUpdates.includes(update));
	
		if (!isValidUpdate) {
			return ({error: "Actualización invalida", res: 400});
		}

		try {
			const direccion =
			await Direccion.findOneAndUpdate({correo: data.query.correo.toString()}, data.body, {
				new: true,
				runValidators: true,
			});
	
			if (!direccion) {
				return ({error: "Correo no encontrado", res: 404});
			}
	
			return ({error: "", res: 200});
		} catch (error) {
			return ({error: error, res: 400});
		}
	}
}