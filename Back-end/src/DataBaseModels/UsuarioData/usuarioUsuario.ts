import {Usuario} from "../../models/usuario/usuario";
import {Direccion} from "../../models/usuario/direccion";
import {Cartera} from "../../models/usuario/cartera";

export default class UsuarioDataModel {

	async get(data) {
		try {
			const filter = data.query.correo?{correo: data.query.correo.toString()} : {};
			const usuario = await Usuario.find(filter);

			if (usuario.length !== 0) {
				return ({usuario: usuario, res: 200, error: ""});
			}
			return ({usuario: "", res: 404, error: "Usuario no encontrado"});
			
		} catch (error) {
			return ({usuario: "", res: 500, error: error});
		}
	}

	async post(data) {
		try {
			const usuario = new Usuario(data.body);

			await usuario.save();
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
			const usuario = await Usuario.findOneAndDelete({correo: data.query.correo.toString()});
			const direccion = await Direccion.findOneAndDelete({correo: data.query.correo.toString()});
			const cartera = await Cartera.findOneAndDelete({correo: data.query.correo.toString()});

	
			if (!usuario || !direccion || !cartera) {
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
	
		const allowedUpdates = ['nombre', 'apellidos', 'foto'];
		const actualUpdates = Object.keys(data.body);
		const isValidUpdate =
			actualUpdates.every((update) => allowedUpdates.includes(update));
	
		if (!isValidUpdate) {
			return ({error: "Actualizacón invalida", res: 400});
		}

		try {
			const usuario =
			await Usuario.findOneAndUpdate({correo: data.query.correo.toString()}, data.body, {
				new: true,
				runValidators: true,
			});
	
			if (!usuario) {
				return ({error: "Correo no encontrado", res: 404});
			}
	
			return ({error: "", res: 200});
		} catch (error) {
			return ({error: error, res: 400});
		}
	}
}