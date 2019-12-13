# social-media-app

To run create the project:

create .env file containing:

DB_ADMIN_USERNAME=W12TF5Cu
DB_ADMIN_PASSWORD=XhgKO97clx1Q
DB_NAME=socialMediaApi
//Fill in the variable value below with the associated values
DB_URI=mongodb://DB_ADMIN_USERNAME:DB_ADMIN_PASSWORD@mongo:27017/DB_NAME?authSource=admin
REDIS_URI=redis
JWT_SECRET=
SITE_EMAIL=
SITE_PWD=

To run project run: 'SUDO docker-compose up --build'
