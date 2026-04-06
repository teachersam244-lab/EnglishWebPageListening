# Usamos Node ligero
FROM node:18-alpine

# Creamos directorio dentro del contenedor
WORKDIR /app

# Copiamos todos los archivos del proyecto
COPY . .

# Instalamos un servidor estático
RUN npm install -g http-server

# Exponemos el puerto que usará Dockploy
EXPOSE 8080

# Comando para correr la app
CMD ["http-server", ".", "-p", "8080"]
