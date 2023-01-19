/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert')
const mongoose = require('mongoose')
const connect = mongoose.connect
const disconnect = mongoose.disconnect
const { When, Then, BeforeAll, AfterAll } = require('@cucumber/cucumber')
const { Usuario } = require('../../dist/models/usuario/usuario')
const { Pan } = require('../../dist/models/pan/pan')
const { MongoMemoryServer } = require('mongodb-memory-server')

let validationResult
// Unidad de testeo para la API
let mongoServer

BeforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await connect(mongoServer.getUri(), { dbName: 'Testing' })
})

// Cerrar la base de datos en memoria y la conexión
AfterAll(async () => {
  await disconnect()
  await mongoServer.stop()
})

When('se crea un usuario sin valores', () => {
  const user = new Usuario({})
  validationResult = user.validateSync()
})
Then('el usuario no debe tener correo ni contraseña', () => {
  if (validationResult) {
    let message = validationResult.errors.correo.message
    assert.equal(message, 'Path `correo` is required.')
    message = validationResult.errors.password.message
    assert.equal(message, 'Path `password` is required.')
  }
})

When('se crea un usuario con valores', async () => {
  const user = new Usuario({ correo: 'aluu@ull.es', password: 'Audsa6' })
  await user.save()
  validationResult = await Usuario.findOne({ correo: 'aluu@ull.es' })
})
Then('el usuario debe tener correo y contraseña', () => {
  if (validationResult) {
    assert.equal(validationResult.correo, 'aluu@ull.es')
    assert.equal(validationResult.password, 'Audsa6')
  }
})

When('se crea un Pan sin valores', () => {
  const pan = new Pan({})
  validationResult = pan.validateSync()
})

Then('el pan no debe tener datos', () => {
  if (validationResult) {
    let message = validationResult.errors.identificador.message
    assert.equal(message, 'Path `identificador` is required.')
    message = validationResult.errors.tipo.message
    assert.equal(message, 'Path `tipo` is required.')
    message = validationResult.errors.nombre.message
    assert.equal(message, 'Path `nombre` is required.')
    message = validationResult.errors.precio.message
    assert.equal(message, 'Path `precio` is required.')
    message = validationResult.errors.vendedor.message
    assert.equal(message, 'Path `vendedor` is required.')
    message = validationResult.errors.descripcion.message
    assert.equal(message, 'Path `descripcion` is required.')
    message = validationResult.errors.ingredientes.message
    assert.equal(message, 'Path `ingredientes` is required.')
    message = validationResult.errors.image.message
    assert.equal(message, 'Path `image` is required.')
  }
})

When('se crea un pan con valores', async () => {
  const pan = new Pan({ identificador: 1050, tipo: 'Molde', nombre: 'Pan rico', precio: 10, vendedor: 'Lala', descripcion: 'Un pan bien rico', ingredientes: 'Agua y pan', image: 'sadaasda' })
  await pan.save()
  validationResult = await Pan.findOne({ identificador: 1050 })
})
Then('el pan debe tener valores', () => {
  if (validationResult) {
    assert.equal(validationResult.identificador, 1050)
    assert.equal(validationResult.tipo, 'Molde')
    assert.equal(validationResult.nombre, 'Pan rico')
    assert.equal(validationResult.precio, 10)
    assert.equal(validationResult.vendedor, 'Lala')
    assert.equal(validationResult.descripcion, 'Un pan bien rico')
    assert.equal(validationResult.ingredientes, 'Agua y pan')
  }
})
