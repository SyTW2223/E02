# alPanPan

API RESTFUL- Los usuarios de aplicación podrán realizar la compra online de panes 


## Authors

- [@alu0101329161](https://www.github.com/alu0101329161)
- [@AKALugo](https://www.github.com/AKALugo)
- [@marcocabrerahdez](https://www.github.com/marcocabrerahdez)

## Installation

Install my-project with npm

```bash
  git clone git@github.com:SyTW2223/E02.git
  cd E02
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

**Client:** React, Redux,

**Server:** Node, Koa


## License

[MIT](https://choosealicense.com/licenses/mit/)

