# Supermarket SaaS Platform

This is a multi-tenant SaaS platform for supermarkets, built with FastAPI, React, PostgreSQL, and Docker.

## Prerequisites

- **Docker Desktop**: Make sure Docker is installed and running on your system.

---

## Production Deployment

This project is ready for production deployment using its Docker setup.

### 1. Push to GitHub
Push your code to a private GitHub repository. Ensure your `.env` file is listed in `.gitignore` and is **not** committed.

### 2. Server Setup (Using a Control Panel like EasyPanel)
1.  **Connect Your Repository**: In your server's control panel, connect it to your GitHub repository.
2.  **Set Environment Variables**: Do not use a `.env` file in production. Instead, use your panel's interface to set the following environment variables:
    - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`: Use strong, unique credentials for your production database.
    - `DATABASE_URL`: `postgresql://<user>:<password>@db:5432/<db_name>` (use the container name `db` as the host).
    - `SECRET_KEY`: **Generate a new, secure key**. You can use `openssl rand -hex 32` to create one.
    - `ADMIN_EMAIL`, `ADMIN_PASSWORD`: Set the credentials for the initial global administrator.
    - `BACKEND_CORS_ORIGINS`: **This is critical for security.** Set it to the domain of your frontend. Example: `["https://www.your-supermarket.com"]`

3.  **Deploy**: Use your panel's "Deploy" feature. It will read the `docker-compose.yml` file and orchestrate the build and launch of all services.

---

## Local Development

### One-Click Installation (macOS)

For the easiest setup on a Mac, use the provided installation script.

#### 1. Make the Script Executable (One-Time Setup)
```bash
chmod +x install-app.sh
```

#### 2. Run the Installer
Simply double-click the `install-app.sh` file in Finder. The script will set up, build, and launch everything, opening the app in your browser when ready.

---

### Manual Installation Steps

#### 1. Configure Environment
Create a `.env` file by copying the example:
```bash
cp .env.example .env
```
The defaults are fine for local development.

#### 2. Build and Run
```bash
docker-compose up --build -d
```

### Accessing the Application
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
