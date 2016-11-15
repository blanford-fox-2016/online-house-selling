# Online House Selling

## Install Global Package

```
npm install -g nodemon liveserver express-generator bower
```

## Run Server

```
npm install
npm start
```

## Run Client

```
bower install
live-server
```

## Models

### House

```
const House = new Schema({
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    }
    photoPath: {
        type: String,
        required: true,
    }
})
```

## Routing

### API House

| Endpoint              | HTTP      | Description               |
| ----------            | -----     | ------------              |
| api/house/seed        | GET       | Create Dummy House Data   |
| api/house             | GET       | Get All House             |
| api/house             | POST      | Create House              |
| api/house             | DELETE    | Delete All House          |
| api/house/:houseId    | DELETE    | Delete House By houseId   |
| api/house/:houseId    | PUT       | Update House By houseId   |