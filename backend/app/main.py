from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Backend is running successfully"}

from app.database import engine
from app import models

@app.on_event("startup")
def create_tables():
    print("🔄 Criando tabelas no banco se não existirem...")
    models.Base.metadata.create_all(bind=engine)
    print("✅ Tabelas criadas com sucesso!")
