# Imagen de producción del frontend de El Zarape.
# Etapa 1: Node compila la aplicación. Etapa 2: nginx sirve el resultado.

FROM node:22-alpine AS compilar
WORKDIR /app

# Las dependencias se instalan primero: si no cambian, Docker reutiliza esta capa
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM nginx:1.27-alpine

# La dirección de la API se define al ARRANCAR el contenedor (no al compilar),
# así la misma imagen sirve para cualquier dominio. Ver nginx.conf.template
ENV API_URL=""

# nginx sustituye las variables de entorno de las plantillas de esta carpeta
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=compilar /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q --spider http://127.0.0.1/ || exit 1
