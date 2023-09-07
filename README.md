# book_shelf

A simple fullstack (node/express API and react/material-ui frontend) implementation of a Books List with base CRUD and search functionalities.

Supported features:

- add book deatais (creat)
- list books details (read)
- edit book details (update)
- delete book entry (delete)
- search book title, author, isbn (search)
- pagination

Note:
For ease of testing and giving that this will not be a production app, The api is not auth protected, I allowed any string as ISBN without validation and used Int as IDs as opposed to something like UUID. Some other things I have intentionally left out are logging and error handling.

The database initialisation seeds some test data to the DB. You should have some data once the app is started

## Setup

### Requirements

- docker (have docker installed or have a running instance of Microsoft Sequel Server)
- node verson (v18.17.1) or later

#### With Makefile

If you are on mac or linux environment with make, you can use make for the setup

First Time initialisation:
~start docker for db

`$ make run_db_docker`

~initialise DB

`$ make init_backend`

this will start the backend application.
On a new terminal, start the Frontend

~start frontend

`$ make start_frontend`

Subseuently you can start the application with the follwing commands:

`$ make start_backend` to start the backend

`$ make start_frontend` to start the frontend

Access application on http://localhost:8000/ once the application is running.

#### Manual setup

`$ cd ./backend`

First Time initialisation:
~start docker

`$ docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=ntMyPas22rc" -p 1433:1433 -d --name bookshelf_db mcr.microsoft.com/mssql/server:2022-latest`

~initialise DB

`$ npm i`

`$ npx prisma db push`

`$ npx prisma db seed`

~start Backend

`$ npm run dev`

Start the Frontend in a new terminal

`$ cd frontend`

`$ npm i`

`$ npm run dev -- --port 8000`

Access application on http://localhost:8000/ once the application is running.
