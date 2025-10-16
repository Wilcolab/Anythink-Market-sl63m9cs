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

      - Python 3.9+ (if running the original Python server locally)
      yarn install
      ```
      - Node -> http://localhost:8001
   # Anythink Market — Node server (my-express-server)

   This folder contains the Node.js/Express implementation used alongside the original Python server for migration and parity testing.

   In short:

   - Python server: FastAPI + Uvicorn (port 8000)
   - Node server: Express + Nodemon (dev) (port 8001)

   Both servers expose the same simple API so you can run them side-by-side while migrating functionality.

   ## Ports

   - Python: 8000
   - Node: 8001

   ## Node: explicit dependencies

   The Node server requires the following packages (declared in `package.json`):

   - `express` (runtime)
   - `nodemon` (dev dependency used by `yarn start` for automatic reload)

   Install locally if needed:

   ```bash
   cd my-express-server
   yarn install
   # or explicitly:
   yarn add express
   yarn add --dev nodemon
   ```

   ## Start the Node server (development)

   1. Install dependencies

   ```bash
   cd my-express-server
   yarn install
   ```

   2. Start in development mode (nodemon will reload on changes)

   ```bash
   # default PORT is 8001
   yarn start

   # or explicitly set PORT
   PORT=8001 yarn start
   ```

   Notes on `yarn start`:

   - `yarn start` runs the script defined in `package.json` which uses nodemon to execute `src/index.js` and watch the `src` directory.
   - If you are running the server inside Docker and you bind-mount the project directory, preserve the container's `node_modules` or install nodemon locally to avoid `nodemon: not found` errors.

   ### Environment variables and configuration (Node)

   - `PORT` — port the Node server listens on. Defaults to `8001` if not provided.
   - No other configuration variables are required for the simple demo. If you add new environment variables, restart the server to pick them up in development.

   Example (running on a different port):

   ```bash
   PORT=3000 yarn start
   ```

   ## Endpoints (shared contract)

   - GET / -> returns `Hello World` (plain text)
   - GET /tasks -> returns JSON: `{ "tasks": [ ... ] }`
   - POST /tasks -> accepts JSON `{ "text": "..." }` and returns `{ "message": "Task added successfully" }`

   ## Run both servers with Docker Compose (recommended)

   The repository root contains a `docker-compose.yml` that builds and runs both services together:

   ```bash
   # from repository root

   ```

   This will:

   - Build images for both services
   - Run the Python service on host port 8000
   - Run the Node service on host port 8001

   Stop and remove containers:

   ```bash
   docker compose down
   ```

   ## Example requests (Node)

   ```bash
   # GET root
   curl http://localhost:8001/

   # GET tasks
   curl http://localhost:8001/tasks

   # POST a task
   curl -X POST -H "Content-Type: application/json" -d '{"text":"New task"}' http://localhost:8001/tasks
   ```

   Replace `8001` with `8000` to target the Python server.

   ## Troubleshooting

   - `nodemon` not found in container: make sure `nodemon` is installed and that you are not hiding the container `node_modules` by a host mount. The recommended compose configuration preserves the container `node_modules` to avoid this issue.
   - Port conflicts: ensure nothing else is bound to 8000/8001 on the host.
   - If the Python container exits immediately, check that `python-server/src/main.py` defines a FastAPI `app` and that Dockerfile runs `uvicorn src.main:app`.

   ## Migration notes

   - The Node server mirrors the Python API and in-memory task list so you can compare responses while migrating functionality.
   - Both servers use an in-memory tasks array; for production migration, move to a shared persistent store (database) and add tests.

   If you'd like, I can update this README to add:

   - a `/healthz` endpoint example
   - a small parity test script that calls both servers and compares responses
   - instructions for running tests in CI

   Generated on 2025-10-16
      Generated on 2025-10-16
