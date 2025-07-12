# Usamos una imagen oficial de Node.js
FROM node:20

# Creamos directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Construimos la app Next.js
RUN npm run build

# Expone el puerto 3000 por defecto
EXPOSE 3000

# Comando para arrancar el servidor
CMD ["npm", "start"]