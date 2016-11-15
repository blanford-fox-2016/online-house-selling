# Online House Selling

## Install Global Packages

`npm install -g express-generator live-server`

## Install Local Depedencies

`npm install`

## Run Server

`npm run dev`

## Run Client

`live-server`

## Routes

Endpoint                                 | HTTP   | Description
---------------------------------------- | ------ | --------------------------------------
`http://localhost:3000/api/property`     | GET    | Get all on sale property               |
`http://localhost:3000/api/property`     | POST   | Create new sale property               |
`http://localhost:3000/api/property/:id` | GET    | Get details of selected property by id |
`http://localhost:3000/api/property/:id` | PUT    | Update selected property by id         |
`http://localhost:3000/api/property/:id` | DELETE | Delete selected property by id         |
