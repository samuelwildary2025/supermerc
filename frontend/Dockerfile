# ===========================
# Etapa 1: build da aplicação
# ===========================
FROM node:18-alpine AS build
WORKDIR /app

# Copia e instala dependências
COPY package*.json ./
RUN npm install

# Copia todo o código e executa o build
COPY . .
RUN npm run build

# ===========================
# Etapa 2: Servir com Nginx
# ===========================
FROM nginx:alpine

# Copia os arquivos compilados do Vite para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração personalizada do Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta padrão
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
