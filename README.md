# Posts RESTful API

A RESTFul API with the opportunities to manipulate users and posts data.

## Technology stack

- Backend
    - [Node.js](https://nodejs.org/en)
        - [Express.js](https://expressjs.com/)
        - [class-validator](https://www.npmjs.com/package/class-validator)
        - [class-transformer](https://www.npmjs.com/package/class-transformer)
        - [mongoose](https://mongoosejs.com/) etc.
    - [TypeScript](https://www.typescriptlang.org/)

- Database
    - [MongoDB](https://www.mongodb.com/)

- Infrastructure
    - [Docker](https://www.docker.com/) (for local MongoDB launch)

## Methods

- `/api` Application REST API
    - `/users` Actions with users
        - `POST /register` User registration
        - `POST /login` User login (get JWT Token)
        - `PATCH /:id` Update user data
        - `DELETE /:id` Delete user    