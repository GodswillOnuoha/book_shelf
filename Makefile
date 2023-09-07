run_db_docker:
	docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=ntMyPas22rc" -p 1433:1433 -d --name bookshelf_db mcr.microsoft.com/mssql/server:2022-latest

cleanup:
	docker kill bookshelf_db && docker rm bookshelf_db

init_dev_db:
	cd ./backend; npm i;\
	npx prisma db push;\
	npx prisma db seed

init_backend: init_dev_db start_backend

start_backend:
	cd ./backend; npm run dev

start_frontend:
	cd ./frontend && npm i && npm run dev -- --port 8000

