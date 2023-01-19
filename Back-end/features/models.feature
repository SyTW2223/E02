Feature: Probar modelos
  Pruebas para los modelos

Scenario: Probar modelo de usuario
When se crea un usuario sin valores
Then el usuario no debe tener correo ni contraseña

Scenario: Probar modelo de usuario
When se crea un usuario con valores
Then el usuario debe tener correo y contraseña

Scenario: Probar modelo de pan
When se crea un Pan sin valores
Then el pan no debe tener datos

Scenario: Probar modelo de pan
When se crea un pan con valores
Then el pan debe tener valores