# Access Control

June 23, 2021

## Description

A RESTful api that supports basic authentication and bearer token authentication

<!-- [https://cs-bearer-auth.herokuapp.com/](https://cs-bearer-auth.herokuapp.com/) -->

## Start up

Clone the repo from github, and install the necessary dependencies.

```BASH
npm i
npm start
```

## UML

![Basic authentication process](UML.png)

## Routes

### /signup

#### POST

* Status code: 201
* Inputs:
  * username: `STRING`, `required = true`
  * password: `STRING`, `required = true`
  * roles: `user || `
* JSON response:
  * Returns a newly created `user` record
  * Token: `STRING`
  * Capabilities: `ENUM`(?)
  * username: `STRING`
  * password: `STRING`
  * createdAt: `STRING`
  * updatedAt: `STRING`

```JSON
{
  "user": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluLWJhc2ljIiwiaWF0IjoxNjI0NDkyODk1fQ.822_6y_gUA7wlTUW-BCcsqFZAr9vip5GoxBT4xzKq0s",
    "capabilities": [
      "read",
      "create",
      "update",
      "delete"
    ],
    "id": 1,
    "username": "admin-basic",
    "password": "$2b$10$bgWWIUj9FzVTGSNjTj9Cce87HgeJO6I/IlKxb9XZriEhtpddOyXBq",
    "role": "admin",
    "updatedAt": "2021-06-24T00:01:35.450Z",
    "createdAt": "2021-06-24T00:01:35.450Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluLWJhc2ljIiwiaWF0IjoxNjI0NDkyODk1fQ.822_6y_gUA7wlTUW-BCcsqFZAr9vip5GoxBT4xzKq0s"
}
```

### /signin

#### POST

* Status code: 200
* Inputs:
  * authorization header
  * `username` and `password` encoded in base64
* JSON response:
  * Returns a previously created `user` record
  * Token: `STRING`
  * username: `STRING`
  * password: `STRING`
  * createdAt: `STRING`
  * updatedAt: `STRING`

```JSON
{
  "user": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluLWJhc2ljIiwiaWF0IjoxNjI0NDkyODk1fQ.822_6y_gUA7wlTUW-BCcsqFZAr9vip5GoxBT4xzKq0s",
    "capabilities": [
      "read",
      "create",
      "update",
      "delete"
    ],
    "id": 1,
    "username": "admin-basic",
    "password": "$2b$10$bgWWIUj9FzVTGSNjTj9Cce87HgeJO6I/IlKxb9XZriEhtpddOyXBq",
    "role": "admin",
    "updatedAt": "2021-06-24T00:01:35.450Z",
    "createdAt": "2021-06-24T00:01:35.450Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluLWJhc2ljIiwiaWF0IjoxNjI0NDkyODk1fQ.822_6y_gUA7wlTUW-BCcsqFZAr9vip5GoxBT4xzKq0s"
}
```

### /users

#### GET

* Status code: 200
* Inputs: ()
  * Bearer Token
  * Delete permissions
* response:
  * List of `usernames` as an `Array`

```JSON
[
  "admin-basic",
  "averageUser"
]
```

### /secret

#### GET

* Status code: 200
* Inputs: ()
  * Bearer Token
  * Delete permissions
* response:
  * 'Welcome to the secret area

---

## Resource rotes

### /api/v2/food

#### GET

* status code: 200
  * Inputs: ()
    * Bearer Token
    * Read permissions
  * response
    * A list of all food records as an `Array`

```JSON
[
  {
    "id": 1,
    "name": "string beans",
    "calories": 100,
    "type": "fruit",
    "createdAt": "2021-06-24T00:42:01.687Z",
    "updatedAt": "2021-06-24T00:42:01.687Z"
  },
  {
    "id": 2,
    "name": "pineapple",
    "calories": 100,
    "type": "fruit",
    "createdAt": "2021-06-24T01:19:35.626Z",
    "updatedAt": "2021-06-24T01:19:35.626Z"
  }
]
```

### /api/v2/food/:id

#### GET

* Status code: 200
* Inputs:
  * Read permissions
  * Id: `INTEGER`
* JSON response:
  * id: `INTEGER`
  * name: `STRING`
  * calories: `INTEGER`
  * type: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`

```JSON
{
  "id": 2,
  "name": "pineapple",
  "calories": 100,
  "type": "fruit",
  "createdAt": "2021-06-24T01:19:35.626Z",
  "updatedAt": "2021-06-24T01:19:35.626Z"
}
```

### POST

* Status code: 201
* Inputs:
  * Create permissions
  * JSON:
    * Name: `STRING`
    * Calories: `INTEGER`
    * Type: `STRING`
* JSON response
  * id: `INTEGER`
  * name: `STRING`
  * calories: `INTEGER`
  * type: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`

```JSON
{
  "id": 2,
  "name": "pineapple",
  "calories": 100,
  "type": "fruit",
  "createdAt": "2021-06-24T01:19:35.626Z",
  "updatedAt": "2021-06-24T01:19:35.626Z"
}
```

### PUT

* Status code: 203
* Inputs:
  * Update permissions
  * id: `INTEGER`
  * JSON:
    * Name: `STRING`
    * Calories: `INTEGER`
    * Type: `STRING`
* JSON response
  * id: `INTEGER`
  * name: `STRING`
  * calories: `INTEGER`
  * type: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`

```JSON
{
  "id": 2,
  "name": "pineapple",
  "calories": 100,
  "type": "fruit",
  "createdAt": "2021-06-24T01:19:35.626Z",
  "updatedAt": "2021-06-24T01:19:35.626Z"
}
```

### DELETE

* Status code: 204
* Inputs:
  * Delete permissions
  * id: `INTEGER`

### /api/v2/clothes

#### GET

* status code: 200
  * Inputs: ()
    * Bearer Token
    * Read permissions
  * response
    * A list of all clothes records as an `Array`

```JSON
[
  {
    "id": 1,
    "name": "pleather jeans",
    "color": "black",
    "size": "tiny",
    "createdAt": "2021-06-24T01:19:35.626Z",
    "updatedAt": "2021-06-24T01:19:35.626Z"
  },
  {
    "id": 2,
    "name": "denim jeans",
    "color": "blue",
    "size": "large",
    "createdAt": "2021-06-24T01:19:35.626Z",
    "updatedAt": "2021-06-24T01:19:35.626Z"
  }
]
```

### /api/v2/clothes/:id

#### GET

* Status code: 200
* Inputs:
  * Read permissions
  * id: `INTEGER`
* JSON response:
  * id: `INTEGER`
  * name: `STRING`
  * color: `INTEGER`
  * size: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`

```JSON
{
  "id": 2,
  "name": "denim jeans",
  "color": "blue",
  "size": "large",
  "createdAt": "2021-06-24T01:19:35.626Z",
  "updatedAt": "2021-06-24T01:19:35.626Z"
}
```

### POST

* Status code: 201
* Inputs:
  * Create permissions
  * JSON:
    * name: `STRING`
    * color: `INTEGER`
    * size: `STRING`
* JSON response
  * id: `INTEGER`
  * name: `STRING`
  * color: `INTEGER`
  * size: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`

```JSON
{
  "id": 2,
  "name": "denim jeans",
  "color": "blue",
  "size": "large",
  "createdAt": "2021-06-24T01:19:35.626Z",
  "updatedAt": "2021-06-24T01:19:35.626Z"
}
```

### PUT

* Status code: 203
* Inputs:
  * Update permissions
  * id: `INTEGER`
  * JSON:
    * name: `STRING`
    * color: `INTEGER`
    * size: `STRING`
* JSON response
  * id: `INTEGER`
  * name: `STRING`
  * color: `INTEGER`
  * size: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`

```JSON
{
  "id": 2,
  "name": "denim jeans",
  "color": "blue",
  "size": "large",
  "createdAt": "2021-06-24T01:19:35.626Z",
  "updatedAt": "2021-06-24T01:19:35.626Z"
}
```

### DELETE

* Status code: 204
* Inputs:
  * Delete permissions
  * id: `INTEGER`

## Contributors

Tim Egorov, Tek Jones.

<!--  -->