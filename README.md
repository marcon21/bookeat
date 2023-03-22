# BookEat
## Requirements
- Docker and docker-compose (V2)

## How to use
For starting up the project run
```sh
docker compose up
```
mongo-express will be exposed on http://localhost:8081

The node express backend will be exposed on http://localhost:3001

----------------

For re-building the containers (every time package.json changes) run
```sh
docker compose build
```