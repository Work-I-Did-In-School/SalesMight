# Access Control

June 23, 2021

## Description

A RESTful api that supports basic authentication and bearer token authentication

[https://cs-bearer-auth.herokuapp.com/](https://cs-bearer-auth.herokuapp.com/)

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluLWJhc2ljIiwiaWF0IjoxNjI0NDc1ODUyfQ.Az1VkhEQLmS2-IRoaE7MDKIOpFKWoY-ITRK6_SP9Mqk",
    "id": 1,
    "username": "admin-basic",
    "password": "$2b$10$E4OBsMw1nBjb3iNchmox4OG5AZlVLft1BpmPovo9VJBwKpspQMwK.",
    "createdAt": "2021-06-23T19:16:58.709Z",
    "updatedAt": "2021-06-23T19:16:58.709Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluLWJhc2ljIiwiaWF0IjoxNjI0NDc1ODUyfQ.Az1VkhEQLmS2-IRoaE7MDKIOpFKWoY-ITRK6_SP9Mqk"
}
```

## Contributors

Tim Egorov, Tek Jones.

<!--  -->