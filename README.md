# social-media-app

A social media app created using: React, Express, JWT authentication, docker, CircleCI, Mongodb, Mongoose, Next.js (SSR), Redis, API,Semantic UI, Javascript, Jest.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Create a .env file in the root directory
```
DB_ADMIN_USERNAME=
DB_ADMIN_PASSWORD=
DB_NAME=
//Fill in the variable names below with the associated values
DB_URI=mongodb://DB_ADMIN_USERNAME:DB_ADMIN_PASSWORD@mongo:27017/DB_NAME?authSource=admin
REDIS_URI=redis
JWT_SECRET=
SITE_EMAIL=
SITE_PWD=
```
### Installing

Run the following command from the root directory
```
SUDO docker-compose up --build
```
### Running

Run the following command from the root directory
```
SUDO docker-compose up
```
