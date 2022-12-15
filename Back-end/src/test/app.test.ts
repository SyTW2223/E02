import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../env/config";
import {connect, disconnect} from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';


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
			cvv: "1124",
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
		expect(response.text).toBe("{\"usuario\":\"\",\"res\":404,\"error\":\"Usuario no encontrado\"}");
	});
	
	test("Test post usuarioRegister", async () => {
		const response = await request(app.callback())
			.post("/usuarioRegister")
			.send({
				correo: "alu010132@gmail.com",
				password: "hola1234",
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
				password: "hola1234",
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
