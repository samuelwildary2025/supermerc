FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Define a variável de ambiente do Alembic
ENV PYTHONPATH=/app

# Cria as tabelas automaticamente ao subir o container
CMD ["bash", "-c", "cd backend && alembic -c alembic.ini upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
