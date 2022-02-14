# Welcome to the My Stories

This repo contains the backend api and services for created micro stories.
Have fun.

## env variables Required

DATABASE_URL= `database connection string`
GOOGLE_CLIENT_ID = `google client id`
GOOGLE_CLIENT_SECRET = `google client secret`
REDIRECT_URL = `http://localhost:5000/auth/redirect`

<!-- redirect url specified in the google cloud when creating credentials -->

JSON_WEBTOKEN_SECRET = `json web token secret`

# Tech Stack

- Backend - Nest.js
- frontend - Next.js
- Database - mysql
- ORM - prisma
- Styling - TailwindCSS

# Commands

- `npm run start:dev` to start the server in development mode.
- `npm run start:prod` to start server in production mode.
- `npm run build` to build the project.
