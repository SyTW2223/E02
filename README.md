# alPanPan
[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=SyTW2223_E02)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=SyTW2223_E02&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=SyTW2223_E02)[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=SyTW2223_E02&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=SyTW2223_E02)[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=SyTW2223_E02&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=SyTW2223_E02)


__API RESTFUL__- Los usuarios de aplicación podrán realizar la compra online de panes .
En la aplicacion se podrán realizar las siguientes acciones:
- Crear un usuario
- Iniciar sesión
- Registrarse
- Ver el listado de panes
- Ver el detalle de un pan
- Ver los panes más vendidos/visitados
- Añadir un pan al carrito
- Ver el listado de panes del carrito
- Eliminar un pan del carrito
- Realizar el pago del carrito 



## Authors

- [@alu0101329161](https://www.github.com/alu0101329161)
- [@AKALugo](https://www.github.com/AKALugo)
- [@marcocabrerahdez](https://www.github.com/marcocabrerahdez)

## Installation

Install my-project with npm

```bash
  git clone git@github.com:SyTW2223/E02.git
  cd E02/Back-end
  npm install
  cd E02/Front-end
  npm install
  npm run dev
```
    
## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Tech Stack

<h3 align="left">Languages and Tools:</h3>

**Client:**
<p align="left"> 
<a href="https://reactjs.org/" target="__blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> 
</a> 
<a href="https://www.cypress.io" target="__blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/6e46ec1fc23b60c8fd0d2f2ff46db82e16dbd75f/icons/cypress.svg" alt="cypress" width="40" height="40"/> 
</a> 
<a href="https://www.typescriptlang.org/" target="__blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> 
</a> 
<a href="https://redux.js.org" target="__blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a>
</p>
<a href="https://jestjs.io" target="__blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> 
</a> 
</p>

**Server:** 
<p align="left"> 
<a href="https://www.mongodb.com/" target="__blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> 
</a> 
<a href="https://nodejs.org" target="__blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> 
</a> 
<a href="https://www.typescriptlang.org/" target="__blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> 
</a> 
<a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> 
</a> 
</p>

## License

[MIT](https://choosealicense.com/licenses/mit/)

