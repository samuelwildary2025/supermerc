# Supermarket SaaS Platform

This is a multi-tenant SaaS platform for supermarkets, built with FastAPI, React, PostgreSQL, and Docker.

## Prerequisites

- **Docker Desktop**: Make sure Docker is installed and running on your system.

---

## One-Click Installation (macOS)

For the easiest setup on a Mac, use the provided installation script.

### 1. Make the Script Executable (One-Time Setup)

Before you can run the script, you need to give it permission to execute. You only need to do this once.

1.  Open the **Terminal** app.
2.  Navigate to the project directory.
3.  Run the following command:
    ```bash
    chmod +x install-app.sh
    ```

### 2. Run the Installer

Simply double-click the `install-app.sh` file in Finder.

The script will automatically:
- Check if Docker is running.
- Set up the necessary configuration files.
- Build and start the database, backend, and frontend services.
- Show a notification when it's done.
- Open the application in your web browser.

Once complete, the application will be available at [http://localhost:5173](http://localhost:5173).

### Stopping the Application

To stop the application, you can use the `stop-app.sh` script (you may need to make it executable first with `chmod +x stop-app.sh`).

---

## Manual Installation Steps

If you prefer to run the commands manually, follow the steps below.

### 1. Configure Environment Variables

Create a `.env` file by copying the example:

```bash
cp .env.example .env
```
The default values are configured to work with Docker Compose. For production, you should change `POSTGRES_PASSWORD` and generate a new `SECRET_KEY` using:
```bash
openssl rand -hex 32
```

### 2. Build and Run with Docker Compose

From the root directory, run:

```bash
docker-compose up --build -d
```

### 3. Accessing the Application

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API Docs (Swagger UI)**: [http://localhost:8000/docs](http://localhost:8000/docs)

### Admin & Client Login
- **Global Admin**: An admin account is created automatically on the first run. The credentials are set in your `.env` file (default: `admin@example.com` / `supersecretpassword`).
- **Client Signup**: New clients can be created via the API endpoint `POST /api/auth/signup-cliente` in the Swagger UI.

## Managing the Application Manually

- **Stop the application**: `docker-compose down`
- **View logs**: `docker-compose logs -f <service_name>` (e.g., `backend`, `frontend`)

## Alembic Migrations

To create a new database migration after changing the SQLAlchemy models:

1. Access the running backend container: `docker-compose exec backend bash`
2. Inside the container, run: `alembic revision --autogenerate -m "Your migration message"`
3. Restart the services to apply the migration: `docker-compose up -d --build`
