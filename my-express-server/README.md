# My Express Server

This project is a simple Express server that listens on port 8001. It is set up to use Nodemon for automatic code reloading during development.

## Getting Started

To get started with this project, follow the instructions below.

1. Clone the repository and enter the project folder:
   ```
   git clone <repository-url>
   cd my-express-server
   ```

2. Install dependencies:
   ```
   yarn install
   Note about the Python server migration
   - The original Python server has been migrated to Node.js. The repository now provides two working servers:
      - Port 8000 — the migrated Python server (now running on Node.js)
      - Port 8001 — the Express server

   Running the servers locally
   - To run either server, set the PORT environment variable before starting:
      ```
      PORT=8000 yarn start   # migrated Python server (now Node)
      PORT=8001 yarn start   # Express server
      ```
   - To run both at the same time, start each instance in a separate terminal with the appropriate PORT value.

   Running with Docker
   - Map the ports when running containers:
      ```
      # Anythink Market — Servers (Python & Node)

      This folder contains the Node/Express server of the Anythink Market demo. The repository also includes the original Python server. Both servers expose the same simple API so you can run them side-by-side while migrating functionality from Python to Node.

      Summary

      - Python server: FastAPI + Uvicorn, listens on port 8000
      - Node server: Express + Nodemon (development), listens on port 8001

      Both servers implement the following contract:

      - GET / -> "Hello World"
      - GET /tasks -> { "tasks": [ ... ] }
      - POST /tasks -> accepts { "text": "..." } and returns { "message": "Task added successfully" }

      Quick tips

      - Node development uses `yarn start` (nodemon) so code changes reload automatically.
      - The `docker-compose.yml` at the repository root runs both services together and maps Python -> 8000, Node -> 8001.

      Requirements

      - Node.js (LTS recommended; repository used Node 14)
      - Yarn (for Node scripts)
      - Python 3.9+ (if running the original Python server locally)
      - Docker & Docker Compose (recommended for parity and reproducible environment)

      Run locally — Node

      1. Install dependencies

      ```bash
      cd my-express-server
      yarn install
      ```

      2. Start the Node server (development — nodemon watches `src`)

      ```bash
      yarn start
      ```

      Visit: http://localhost:8001

      Run locally — Python (optional)

      1. Create and activate a virtual environment

      ```bash
      cd python-server
      python3 -m venv .venv
      source .venv/bin/activate
      ```

      2. Install dependencies and run uvicorn

      ```bash
      pip install -r requirements.txt
      uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
      ```

      Visit: http://localhost:8000

      Run with Docker Compose (recommended)

      From the repository root:

      ```bash
      docker compose up --build
      ```

      This builds both images and launches two containers:

      - Python -> http://localhost:8000
      - Node -> http://localhost:8001

      Stop and remove containers:

      ```bash
      docker compose down
      ```

      Endpoints and examples

      - GET root (Node):

      ```bash
      curl http://localhost:8001/
      # => Hello World
      ```

      - GET tasks:

      ```bash
      curl http://localhost:8001/tasks
      # => { "tasks": [ ... ] }
      ```

      - POST a task:

      ```bash
      curl -X POST -H "Content-Type: application/json" -d '{"text":"New task"}' http://localhost:8001/tasks
      # => { "message": "Task added successfully" }
      ```

      Use port `8000` in the examples above to target the Python server instead.

      Troubleshooting

      - nodemon not found in container: compose is configured to preserve container `node_modules`. If you bind-mount the project root and hide the container `node_modules`, install nodemon locally (`yarn add --dev nodemon`) or install it globally in the Docker image.
      - Python container exits immediately: the image runs `uvicorn src.main:app` — ensure `src/main.py` defines `app` (FastAPI) and does not exit early. Use `docker compose logs python-server --follow` to inspect.

      Migration notes

      - The Node server mirrors the Python endpoints and task list to allow side-by-side comparison while migrating.
      - Both servers use in-memory storage for tasks; migrate to a shared persistent store for production parity.

      If you'd like, I can:

      - Add a `/healthz` endpoint to both services
      - Add automated parity tests that call both services and compare responses
      - Convert the Node server to TypeScript

      Generated on 2025-10-16
