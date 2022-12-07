import {Usuario} from "../../models/usuario/usuario";
import {Direccion} from "../../models/usuario/direccion";
import {Cartera} from "../../models/usuario/cartera";
import { hashPassword, comparePassword } from "../../Bcrypt/bcrypt";
import jwt from 'jsonwebtoken';
import {jwtSecret} from '../../env/config';

export default class UsuarioDataModel {

	async get(data) {
		try {
			const filter = data.correo?{correo: data.correo.toString()} : {};
			const usuario = await Usuario.find(filter);

			if (usuario.length !== 0) {
				return ({usuario: usuario, res: 200, error: ""});
			}
			return ({usuario: "", res: 404, error: "Usuario no encontrado"});
			
		} catch (error) {
			return ({usuario: "", res: 500, error: error});
		}
	}

	async postRegister(data) {

		try {
			const usuario = new Usuario(data.body);
			usuario.password = await hashPassword(usuario.password);
			await usuario.save();
			
			let correo: string = data.body.correo;

			let token = jwt.sign({correo}, jwtSecret, { expiresIn: '1h' })

			return({error: "", res: 201, token: token});

		} catch(error) {
			return({error: error, res: 400, token: ""});
		}
	}

	async postLogin(data) {

		try {
			const filter = data.body.correo?{correo: data.body.correo.toString()} : {};
			const usuario = await Usuario.find(filter);

			if (usuario.length !== 0 && data.body.password) {
				// Verificar contraseña
				const isMatch = await comparePassword(data.body.password, usuario[0].password);
				// Mongo != Bcrypt
				if (!isMatch) {
					return ({usuario: "", res: 400, error: "Contraseña incorrecta", token: ""});
				}

				let correo: string = data.body.correo;
				let token = jwt.sign({correo}, jwtSecret, { expiresIn: '1h' });
				
				return({usuario: usuario, res: 200, error: "", token: token});
			}

			return ({usuario: "", res: 404, error: "Usuario no encontrado", token: ""});
			
		} catch (error) {
			return ({usuario: "", res: 500, error: error, token: ""});
		}
	}

	async delete(data) {
		if (!data.correo) {
			return ({error: "Hace falta el correo", res: 400});
		}
		try {
			const usuario = await Usuario.findOneAndDelete({correo: data.correo.toString()});
	
			if (!usuario) {
				return ({error: "Correo no encontrado", res: 404});
			}
			
			const direccion = await Direccion.findOneAndDelete({correo: data.correo.toString()});
			const cartera = await Cartera.findOneAndDelete({correo: data.correo.toString()});
	
			return ({error: "", res: 200});
		} catch (error) {
			return ({error: error, res: 400});
		}
	}

	async patch(data, change) {
		if (!data.correo) {
			return ({error: "Hace falta el correo", res: 400});
		}
		
		if (change.body.password)
			change.body.password = await hashPassword(change.body.password);

		const allowedUpdates = ['nombre', 'password', 'apellidos', 'foto'];
		const actualUpdates = Object.keys(change.body);
		const isValidUpdate =
			actualUpdates.every((update) => allowedUpdates.includes(update));
	
		if (!isValidUpdate) {
			return ({error: "Actualizacón invalida", res: 400});
		}

		try {
			const usuario =
			await Usuario.findOneAndUpdate({correo: data.correo.toString()}, data.body, {
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