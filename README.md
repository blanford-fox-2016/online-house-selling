# Stackoverflow

## Node Package Module Server

### Install express

```
npm install express-generator -g
express -e
npm install
```

### Install Mongodb and Mongoose

```
npm install mongodb --save
npm install mongoose --save
```

### Install Cors

```
npm install cors --save 
```

### Install express-session

```
npm install express-session --save
```

### Install passport, passport local, and passport local mongoose

```
npm install passport --save
npm install passport-local --save
npm install passport-local-mongoose --save
```

### Install dotenv

```
npm install dotenv --save
```

### Install mocha

```
npm install mocha -g
```

### Install chai and chai-http

```
npm install chai --save
npm install chai-http --save
```

## Models

### questions

```
const Question = new Schema({
    createdBy: Number,
    questionId: Number,
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    votes: [
        {
            type: Number,
            foreignField: 'userId',
            ref: 'users'
        }
    ],
    answers: [
        {
            answerId: Number,
            createdBy: Number,
            answer: {
                type: String,
                required: true
            },
            votes: [
                {
                    type: Number,
                    foreignField: 'userId',
                    ref: 'users'
                }
            ]
        }
    ]
})
```

### users

```
const User = new Schema({
    userId: Number,
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(email){
                return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email)
            },
            message: ''Wrong email format
        }
    }
})
```

## Routing

### API User

| Endpoint          | HTTP      | Description               |
| ----------        | -----     | ------------              |
| api/register      | POST      | Register User             |
| api/login         | POST      | Login User                |
| api/user/seed     | GET       | Create Dummy User Data    |
| api/user          | GET       | Get All User              |
| api/user          | DELETE    | Delete All User           |
| api/user/:userId  | DELETE    | Delete User By userId     |
| api/user/:userId  | PUT       | Update User By userId     |

### API Question

| Endpoint                                  | HTTP      | Description                       |
| ----------                                | -----     | ------------                      |
| api/question/seed                         | GET       | Create Dummy Question Data        |
| api/question                              | GET       | Get All Question                  |
| api/question/:questionId                  | GET       | Get All Question                  |
| api/question/:questionId/answer/:id       | GET       | Get Answer By Id                  |
| api/question                              | POST      | Add Question                      |
| api/question                              | DELETE    | Delete All Question               |
| api/question/:questionId                  | DELETE    | Delete Question By questionId     |
| api/question/answer/:questionId/:id       | DELETE    | Delete Answer                     |
| api/question/:questionId                  | PUT       | Update Question By questionId     |
| api/question/vote/:questionId             | PUT       | Vote Question                     |
| api/question/answer/:questionId           | PUT       | Add Answer                        |
| api/question/:questionId/answer/:id       | PUT       | Update Answer                     |
| api/question/answer/vote/:questionId/:id  | PUT       | Vote Answer                       |


## Client

### Install bower

```
npm install bower -g
bower init
```

### Make bowerrc

```
{
    "directory": "lib/"
}
```

### Install bootstrap

```
bower install bootstrap --save
```