# Anythink Market — Servers

This repository contains two small demo servers used for migration and parity testing:

- Python server: FastAPI + Uvicorn, listens on port 8000
- Node server: Express + Nodemon (development), listens on port 8001

Both servers implement a minimal tasks API so you can run them side-by-side while migrating functionality.

## Project structure

- `python-server/` — original FastAPI implementation
  - `src/main.py` — FastAPI app (defines `app` and routes)
  - `requirements.txt` — Python dependencies
  - `Dockerfile` — builds an image and runs uvicorn

- `my-express-server/` — Node/Express migration target
  - `src/index.js` — Express app (mirrors the Python endpoints)
  - `package.json` — Node dependencies and start script
  - `nodemon.json` — nodemon configuration for development

- `docker-compose.yml` — builds and runs both services for local development

## Getting started (recommended: Docker Compose)

From the repository root run:

```bash
docker compose up --build
```

This builds both images and starts two containers with these host ports:

- Python service -> http://localhost:8000
- Node service -> http://localhost:8001

Stop the running containers:

```bash
docker compose down
```

## Running locally (developer)

Node (my-express-server)

1. Install dependencies

```bash
cd my-express-server
yarn install
```

2. Start the server (development - uses nodemon)

```bash
# default port 8001
yarn start

# or set PORT explicitly
PORT=8001 yarn start
```

Python (python-server)

1. (Optional) Create a virtual environment and install dependencies

```bash
cd python-server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Run locally with uvicorn (the Dockerfile already runs this):

```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

## API (shared contract)

- GET / -> `Hello World` (plain text)
- GET /tasks -> `{ "tasks": [ ... ] }`
- POST /tasks -> accepts `{ "text": "..." }` and returns `{ "message": "Task added successfully" }`

Examples (Node)

```bash
curl http://localhost:8001/
curl http://localhost:8001/tasks
curl -X POST -H "Content-Type: application/json" -d '{"text":"New task"}' http://localhost:8001/tasks
```

Replace `8001` with `8000` to target the Python server.

## Requirements

- Docker & Docker Compose
- Node.js (LTS) + Yarn (for local Node development)
- Python 3.9+ + pip (for local Python development)

## Troubleshooting

- `nodemon: not found` inside Node container — ensure nodemon is in `devDependencies` and that the compose file preserves the image `node_modules` (the repo's compose config already does this). Alternatively install nodemon globally in the Dockerfile.
- Python container exits immediately — check that `python-server/src/main.py` defines `app` and that the Dockerfile runs `uvicorn src.main:app`.
- Port conflicts — ensure nothing else is listening on 8000/8001.

## Migration notes

Both servers keep tasks in memory for the demo. For production parity migrate to a shared persistent store and add tests.

---

If you'd like I can:

- Add a `/healthz` endpoint to both services
- Add a small parity test that calls both servers and compares responses
- Update CI checks or linting to ensure the README format passes repository requirements

Generated on 2025-10-16
