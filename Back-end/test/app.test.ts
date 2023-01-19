import request from "supertest";
import app from "../src/app";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../src/env/config";
import {connect, disconnect} from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Usuario } from "../src/models/usuario/usuario";
import { Pan } from "../src/models/pan/pan";
import { Direccion } from "../src/models/usuario/direccion";
import { Cartera } from "../src/models/usuario/cartera";


// Unidad de testeo para la API
let mongoServer: MongoMemoryServer;

// Inicializar la base de datos en memoria
beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	await connect(mongoServer.getUri(), { dbName: "Testing"});
});

// Cerrar la base de datos en memoria y la conexión
afterAll(async () => {
	await disconnect();
	await mongoServer.stop();
});

// Generar un token de prueba
let token = jwt.sign({ example: "example" }, jwtSecret, { expiresIn: "1h" });

describe("Modelo Usuario", () => {
	test("Usuario vacío", () => {
		const user = new Usuario({});
		const validationResult = user.validateSync();
		if (validationResult) {
			let message = validationResult.errors.correo.message;
			expect(message).toBe("Path `correo` is required.");
			message = validationResult.errors.password.message;
			expect(message).toBe("Path `password` is required.")
		}
	});
	test("Usuario con datos", async () => {
		const user = new Usuario({correo: "aluu@ull.es", password: "Audsa6"});
		await user.save();
		const savedUser = await Usuario.findOne({correo: "aluu@ull.es"});
		if (savedUser) {
			expect(savedUser.correo).toBe("aluu@ull.es");
			expect(savedUser.password).toBe("Audsa6");
		}
	});
});

describe("Modelo Pan", () => {
	test("Pan vacío", () => {
		const pan = new Pan({});
		const validationResult = pan.validateSync();
		if (validationResult) {
			let message = validationResult.errors.identificador.message;
			expect(message).toBe("Path `identificador` is required.");
			message = validationResult.errors.tipo.message;
			expect(message).toBe("Path `tipo` is required.");
			message = validationResult.errors.nombre.message;
			expect(message).toBe("Path `nombre` is required.");
			message = validationResult.errors.precio.message;
			expect(message).toBe("Path `precio` is required.");
			message = validationResult.errors.vendedor.message;
			expect(message).toBe("Path `vendedor` is required.");
			message = validationResult.errors.descripcion.message;
			expect(message).toBe("Path `descripcion` is required.");
			message = validationResult.errors.ingredientes.message;
			expect(message).toBe("Path `ingredientes` is required.");
			message = validationResult.errors.image.message;
			expect(message).toBe("Path `image` is required.");
		}
	});
	test("Pan con datos", async () => {
		const pan = new Pan({identificador: 1050, tipo: "Molde", nombre: "Pan rico", precio: 10, vendedor: "Lala", descripcion: "Un pan bien rico", ingredientes: "Agua y pan", image: "sadaasda"});
		await pan.save();
		const savedPan = await Pan.findOne({identificador: 1050});
		if (savedPan) {
			expect(savedPan.identificador).toBe(1050);
			expect(savedPan.tipo).toBe("Molde");
			expect(savedPan.nombre).toBe("Pan rico");
			expect(savedPan.precio).toBe(10);
			expect(savedPan.vendedor).toBe("Lala");
			expect(savedPan.descripcion).toBe("Un pan bien rico");
			expect(savedPan.ingredientes).toBe("Agua y pan");
		}
	});
});

describe("Modelo Dirección", () => {
	test("Dirección vacía", () => {
		const direccion = new Direccion({});
		const validationResult = direccion.validateSync();
		if (validationResult) {
			let message = validationResult.errors.correo.message;
			expect(message).toBe("Path `correo` is required.");
			message = validationResult.errors.calle.message;
			expect(message).toBe("Path `calle` is required.");
			message = validationResult.errors.numero.message;
			expect(message).toBe("Path `numero` is required.");
			message = validationResult.errors.codigoPostal.message;
			expect(message).toBe("Path `codigoPostal` is required.");
			message = validationResult.errors.provincia.message;
			expect(message).toBe("Path `provincia` is required.");
			message = validationResult.errors.pais.message;
			expect(message).toBe("Path `pais` is required.");
		}
	});
	test("Dirección con datos", async () => {
		const direccion = new Direccion({correo: "ali@prn.com", calle: "Nicaragua", numero: "666777888", codigoPostal: "38500", provincia: "S/C de Tenerife", pais: "España"});
		await direccion.save();
		const savedDireccion = await Direccion.findOne({correo: 1050});
		if (savedDireccion) {
			expect(savedDireccion.correo).toBe("ali@prn.com");
			expect(savedDireccion.calle).toBe("Nicaragua");
			expect(savedDireccion.numero).toBe("666777888");
			expect(savedDireccion.codigoPostal).toBe("38500");
			expect(savedDireccion.provincia).toBe("S/C de Tenerife");
			expect(savedDireccion.pais).toBe("España");
		}
	});
});

describe("Modelo Cartera", () => {
	test("Cartera vacía", () => {
		const cartera = new Cartera({});
		const validationResult = cartera.validateSync();
		if (validationResult) {
			let message = validationResult.errors.correo.message;
			expect(message).toBe("Path `correo` is required.");
		}
	});
	test("Cartera con datos", async () => {
		const cartera = new Cartera({correo: "ali@prn.com", tarjetas: [{marca: "Visa", cvv: "748", numero: "4111111111111111", caducidad: "1222"}]});
		await cartera.save();
		const savedCartera = await Cartera.findOne({correo: "ali@prn.com"});
		if (savedCartera) {
			expect(savedCartera.correo).toBe("ali@prn.com");
			expect(savedCartera.tarjetas[0].caducidad).toBe("1222");
			expect(savedCartera.tarjetas[0].cvv).toBe("748");
			expect(savedCartera.tarjetas[0].marca).toBe("Visa");
			expect(savedCartera.tarjetas[0].numero).toBe("4111111111111111");
		}
	});
});

describe("JWT", () => {
	test("Test no token", async () => {
		const response = await request(app.callback())
			.get("/cartera?correo=alu010132@gmail.com");
		expect(response.status).toBe(401);
		expect(response.text).toBe('{"res":401,"error":"No token provided"}');
	});
	
	test("Test token invalido", async () => {
		const response = await request(app.callback())
		.get("/cartera?correo=alu010132@gmail.com")
		.set("authorization", "Bearer " + "Fake token");
		expect(response.status).toBe(401);
		expect(response.text).toBe('{"res":401,"error":"Invalid token"}');
	});
});


// Pruebas de la ruta /cartera con get, post, put y delete
describe("Cartera", () => {
	test("Test get cartera 404", async () => {
    const response = await request(app.callback())
      .get("/cartera?correo=alu010132@gmail.com")
      .set("authorization", "Bearer " + token);
    expect(response.status).toBe(404);
    expect(response.text).toBe('{"cartera":"","res":404,"error":"cartera no encontrada"}');
  });

  test("Test post cartera", async () => {
	const response = await request(app.callback())
	  .post("/cartera")
	  .set("authorization", "Bearer " + token)
	  .send({
		correo: "alu@gmail.com",
		tarjetas : {
			marca: "Visa",
			cvv: "567",
			numero: "4008696950712322",
			caducidad: "1222",
		},
	  });
	expect(response.status).toBe(201);
	expect(response.text).toBe("{\"error\":\"\",\"res\":201}");
  });

  test("Test patch cartera", async () => {
	const response = await request(app.callback())
	  .patch("/cartera?correo=alu@gmail.com")
	  .set("authorization", "Bearer " + token)
	  .send({
		tarjetas : {
			marca: "Visa",
			cvv: "1234",
			caducidad: "1222",
			numero: "4008696950712322"
		},
	  });
	expect(response.status).toBe(200);
	expect(response.text).toBe("{\"error\":\"\",\"res\":200}");
  });

  test("Test delete cartera", async () => {
	const response = await request(app.callback())
	  .delete("/cartera?correo=alu@gmail.com")
	  .set("authorization", "Bearer " + token);
	expect(response.status).toBe(200);
	expect(response.text).toBe("{\"error\":\"\",\"res\":200}");
  });
});


// Pruebas de la ruta /direccion con get, post, put y delete
describe("Direccion", () => {
	test("Test get direccion 404", async () => {
		const response = await request(app.callback())
			.get("/direccion?correo=alu010132@gmail.com")
			.set("authorization", "Bearer " + token);
		expect(response.status).toBe(404);
		expect(response.text).toBe("{\"direccion\":\"\",\"res\":404,\"error\":\"direccion no encontrada\"}");
	});

	test("Test post direccion", async () => {
		const response = await request(app.callback())
			.post("/direccion")
			.set("authorization", "Bearer " + token)
			.send({
				correo: "alu00@gmail.com",
				calle: "Calle falsa",
				numero: "34650193931",
				codigoPostal: "12345",
				provincia: "Sevilla",
				pais: "España",
			});
		expect(response.status).toBe(201);
		expect(response.text).toBe("{\"error\":\"\",\"res\":201}");
	});

	test("Test patch direccion", async () => {
		const response = await request(app.callback())
			.patch("/direccion?correo=alu00@gmail.com")
			.set("authorization", "Bearer " + token)
			.send({
				calle: "Calle falsa 123",
			});
		expect(response.status).toBe(200);
		expect(response.text).toBe("{\"error\":\"\",\"res\":200}");
	});

	test("Test delete direccion", async () => {
		const response = await request(app.callback())
			.delete("/direccion?correo=alu00@gmail.com")
			.set("authorization", "Bearer " + token);
		expect(response.status).toBe(200);
		expect(response.text).toBe("{\"error\":\"\",\"res\":200}");
	});
});


// Pruebas de la ruta /pan con get, post, put y delete
describe("Pan", () => {
	test("Test get pan 404", async () => {
		const response = await request(app.callback())
			.get("/pan?identificador=1")
			.set("authorization", "Bearer " + token);
		expect(response.status).toBe(404);
		expect(response.text).toBe("{\"pan\":\"\",\"res\":404,\"error\":\"pan no encontrada\"}");
	});
	
	test("Test post pan", async () => {
		const response = await request(app.callback())
			.post("/pan")
			.set("authorization", "Bearer " + token)
			.send({
				identificador: 5,
				tipo: "Integral",
				nombre: "Pan integral",
				precio: 1.5,
				vendedor: "Panaderia Manolo",
				ingredientes: "agua y levadura",
				descripcion: "Un buen pan",
				image: "https://www.panintegral.es/wp-content/uploads/2019/03/pan-integral.jpg",
			});
		expect(response.status).toBe(201);
		expect(response.text).toBe("{\"error\":\"\",\"res\":201}");
	});

	test("Test patch pan", async () => {
		const response = await request(app.callback())
			.patch("/pan?identificador=5")
			.set("authorization", "Bearer " + token)
			.send({
				tipo: "blanco",
			});
		expect(response.status).toBe(200);
		expect(response.text).toBe("{\"error\":\"\",\"res\":200}");
	});

	test("Test delete pan", async () => {
		const response = await request(app.callback())
			.delete("/pan?identificador=5")
			.set("authorization", "Bearer " + token);
		expect(response.status).toBe(200);
		expect(response.text).toBe("{\"error\":\"\",\"res\":200}");
	});
}); 


// Pruebas de la ruta /usuario con get, post, put y delete
describe("Usuario", () => {
	test("Test get usuario 404", async () => {
		const response = await request(app.callback())
			.get("/usuario")
			.set("authorization", "Bearer " + token);
		expect(response.status).toBe(404);
		expect(response.text).toBe("{\"usuario\":\"\",\"res\":404,\"error\":\"Es necesario el correo\"}");
	});
	
	test("Test post usuarioRegister fallo contraseña incorrecta", async () => {
		const response = await request(app.callback())
			.post("/usuarioRegister")
			.send({
				correo: "alu010132@gmail.com",
				password: "hola1234",
			});
		expect(response.status).toBe(400);
		const user = JSON.parse(response.text);
		expect(user.res).toBe(400);
		expect(user.token).toBe("");
	});

	test("Test post usuarioRegister", async () => {
		const response = await request(app.callback())
			.post("/usuarioRegister")
			.send({
				correo: "alu010132@gmail.com",
				password: "Hola1234",
			});
		expect(response.status).toBe(201);
		const user = JSON.parse(response.text);
		expect(user.res).toBe(201);
		expect(user.token).not.toBe("");
	});

	test("Test post usuarioLogin", async () => {
		const response = await request(app.callback())
			.post("/usuarioLogin")
			.send({
				correo: "alu010132@gmail.com",
				password: "Hola1234",
			});
		expect(response.status).toBe(200);
		const user = JSON.parse(response.text);
		expect(user.res).toBe(200);
		expect(user.token).not.toBe("");
		expect(user.usuario).not.toBe("");
	});

	test("Test patch 200 modificado correctamente", async () => {
		const response = await request(app.callback())
			.patch("/usuario?correo=alu010132@gmail.com")
			.set("authorization", "Bearer " + token)
			.send({
				password: "hola4444",
			});
		expect(response.status).toBe(200);
		const user = JSON.parse(response.text);
	});

	test("Test delete 200 borrado correctamente", async () => {
		const response = await request(app.callback())
			.delete("/usuario?correo=alu010132@gmail.com")
			.set("authorization", "Bearer " + token)
		expect(response.status).toBe(200);
	});
});
