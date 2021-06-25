# Access Control

June 23, 2021

## Creators:
Cullen Sharp and Tim Egorov

## Description

SalesMight is mock CRM. It runs on Node.js with Express and supports role based access control with an access control list backed up by bearer and basic authentication.

<!-- [https://cs-bearer-auth.herokuapp.com/](https://cs-bearer-auth.herokuapp.com/) -->

## Start up

Clone the repo from github, and install the necessary dependencies.

```BASH
npm i
npm start
```

## UML

![Basic authentication process](UML1.JPG)
![schemas](UML2.JPG)

## Routes

### /signup

#### POST

* Status code: 201
* Inputs:
  * username: `STRING`, `required = true`
  * password: `STRING`, `required = true`
  * roles: `salesPerson || accountManager`
* JSON response:
  * Returns a newly created `user` record
  * Token: `STRING`
  * Capabilities: `ENUM 
    * accountManger: ['read','update']
    * salesPerson: ['read', 'create','update','delete']
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
    "username": "tom quota",
    "password": "$2b$10$bgWWIUj9FzVTGSNjTj9Cce87HgeJO6I/IlKxb9XZriEhtpddOyXBq",
    "role": "salesPerson",
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
    "username": "tom quota",
    "password": "$2b$10$bgWWIUj9FzVTGSNjTj9Cce87HgeJO6I/IlKxb9XZriEhtpddOyXBq",
    "role": "salesPerson",
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

## Resource routes

### /api/v2/notes

#### GET

* status code: 200
  * Inputs: ()
    * Bearer Token
    * Read permissions
  * response
    * A list of all notes records as an `Array`

```JSON
[
  {
    "id": 1,
    "customerId": 2,
    "text": "Had a phone call with Connie today",
    "createdAt": "2021-06-24T00:42:01.687Z",
    "updatedAt": "2021-06-24T00:42:01.687Z"
  },
  {
    "id": 2,
    "customerId": 3,
    "text": "Discussed options with max",
    "createdAt": "2021-06-24T01:19:35.626Z",
    "updatedAt": "2021-06-24T01:19:35.626Z"
  }
]
```

### /api/v2/customers/:id

#### GET

* Status code: 200
* Inputs:
  * Read permissions
  * Id: `INTEGER`
* returns a list of all customers associated with a salesperson
* JSON response:
  * id: `INTEGER`
  * salesPerson: `INTEGER`
  * name: `STRING`
  * email: `INTEGER`
  * phone: `STRING`
  * title: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`

```JSON
[
  {
    "id": 2,
    "salesPerson": 2,
    "name": "connie long",
    "email": "scam@aol.com",
    "phone": "(505) 557-4793",
    "title": "Regional Assistant to the Vice Assistant",
    "createdAt": "2021-06-24T01:19:35.626Z",
    "updatedAt": "2021-06-24T01:19:35.626Z"
  },
    {
    "id": 1,
    "salesPerson": 2,
    "name": "potential mark",
    "email": "sucker@aol.com",
    "phone": "(432) 432-4322",
    "title": "Regional Assistant to the Vice Assistant",
    "createdAt": "2021-06-24T01:19:35.626Z",
    "updatedAt": "2021-06-24T01:19:35.626Z"
  },
]
```

### POST

* Status code: 201
* Inputs:
  * Create permissions
  * JSON:
    * id: `INTEGER`
    * salesPerson: `INTEGER`
    * name: `STRING`
    * email: `INTEGER`
    * phone: `STRING`
    * title: `STRING`
* JSON response:
  * id: `INTEGER`
  * salesPerson: `INTEGER`
  * name: `STRING`
  * email: `INTEGER`
  * phone: `STRING`
  * title: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`

```JSON
{
  "id": 2,
  "salesPerson": 2,
  "name": "connie long",
  "email": "scam@aol.com",
  "phone": "(505) 557-4793",
  "title": "Regional Assistant to the Vice Assistant",
  "createdAt": "2021-06-24T01:19:35.626Z",
  "updatedAt": "2021-06-24T01:19:35.626Z"
},
```

### PUT

* Status code: 203
* Inputs:
  * Create permissions
  * JSON:
    * id: `INTEGER`
    * salesPerson: `INTEGER`
    * name: `STRING`
    * email: `INTEGER`
    * phone: `STRING`
    * title: `STRING`
* JSON response:
  * id: `INTEGER`
  * salesPerson: `INTEGER`
  * name: `STRING`
  * email: `INTEGER`
  * phone: `STRING`
  * title: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`


```JSON
{
  "id": 2,
  "salesPerson": 2,
  "name": "connie long",
  "email": "scam@aol.com",
  "phone": "(505) 557-4793",
  "title": "Regional Assistant to the Vice Assistant",
  "createdAt": "2021-06-24T01:19:35.626Z",
  "updatedAt": "2021-06-24T01:19:35.626Z"
},
```

### DELETE

* Status code: 204
* Inputs:
  * Delete permissions
  * id: `INTEGER`

### /api/v2/customers/:salespersonid/customerid

### GET

* Status code: 200
* Inputs:
  * Read permissions
  * Id: `INTEGER`
* returns a single customer with all notes associated with them
* JSON response:
  * id: `INTEGER`
  * salesPerson: `INTEGER`
  * name: `STRING`
  * email: `INTEGER`
  * phone: `STRING`
  * title: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`


```JSON
{
  "id": 2,
  "salesPerson": 2,
  "name": "connie long",
  "email": "scam@aol.com",
  "phone": "(505) 557-4793",
  "title": "Regional Assistant to the Vice Assistant",
  "createdAt": "2021-06-24T01:19:35.626Z",
  "updatedAt": "2021-06-24T01:19:35.626Z",
  "notes": [{
    "customerId": 2,
    "text": "Connie is very long"
    }
  ]
}
```
