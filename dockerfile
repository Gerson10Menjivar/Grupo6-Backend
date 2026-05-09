# Usa la imagen oficial de Node.js v20 (ligera)
FROM node:20-alpine

# Carpeta donde vivirá el código dentro de la nube
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las librerías necesarias para que funcione
RUN npm install --omit=dev

# Copiamos todo el código de tu backend
COPY . .

# Variable de entorno para que Node sepa que está en producción
ENV NODE_ENV=production

# Exponemos el puerto 3000 (el que usa tu app habitualmente)
EXPOSE 3000

# El comando que arranca tu sistema
CMD ["npm", "start"]