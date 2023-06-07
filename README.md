# BookEat
## Requirements
- Docker and docker-compose (V2)

## How to use
For starting up the project run
```sh
docker compose up --build
```
The node react frontend will be exposed on http://localhost:4000

mongo-express will be exposed on http://localhost:8081

The node express backend will be exposed on http://localhost:3001


----------------

## Dependencies change
For re-building the containers (every time package.json changes) run
```sh
docker compose up --build
```
In another terminal run
```sh
docker exec -it bookeat_backend_1 bash
```
for backend dependencies or
```sh
docker exec -it bookeat_frontend_1 /bin/sh
```
for frontend dependencies

inside the container run
```sh
npm i
```
then stop the containers and run
```sh
docker compose up --build
```
----------------
## Testing
For testing the backend api run
```sh
docker exec -it bookeat_backend_1 bash
```
inside the container run
```sh
npm run test
```
After the tests are done, the report will be available at `bookeat/backend/app/report/test-report.html`

----------------

## Documentation
The api documentation is available at `https://bookeat.docs.apiary.io`

----------------