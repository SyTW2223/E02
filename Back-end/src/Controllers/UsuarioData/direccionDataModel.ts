import {Direccion} from "../../models/usuario/direccion";

export default class DireccionDataModel {

	async get(data) {
		try {
			const filter = data.correo?{correo: data.correo.toString()} : {};
			if (!filter.correo) {
				return ({usuario: "", res: 404, error: "Es necesario el correo"});
			}

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
		if (!data.correo) {
			return ({error: "Hace falta el correo", res: 400});
		}
		try {
			const direccion = await Direccion.findOneAndDelete({correo: data.correo.toString()});
	
			if (!direccion) {
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
	
		const allowedUpdates = ['calle', 'numero', 'codigoPostal', 'provincia', 'pais'];
		const actualUpdates = Object.keys(change.body);
		const isValidUpdate =
			actualUpdates.every((update) => allowedUpdates.includes(update));
	
		if (!isValidUpdate) {
			return ({error: "Actualización invalida", res: 400});
		}

		try {
			const direccion =
			await Direccion.findOneAndUpdate({correo: data.correo.toString()}, change.body, {
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