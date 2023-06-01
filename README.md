# ChatGPT - Learning Vue.js

## Instalar

### Docker

- Con el proyecto desacargado, dentro de la carpeta raiz ejecurar: `docker compose up`  
- Se ejecutarán tres contenedores:
  1. client (Vue.js)
  2. server (Node.js)
  3. mongo (MongoDB)
- La aplicación estará accesible en `http://localhost:8080`

### Manual

- Si se quiere ejecutar la aplicación de forma manual, segue los siguientes pasos:
  1. Con un terminal, entre dentro de la carpeta "client": `cd ./ChatGPT/client`
  2. Installe todas las dependencias: `npm install`
  3. Ejecute el cliente: `npm run serve`
  4. El cliente se ejecuta en `http://localhost:8080` .
  5. Con otro, entre dentro de la carpeta "server": `cd ./ChatGPT/server`
  6. Installe todas las dependencias: `npm install`
  7. Ejecute el servidor: `npm run dev`
  8. El servidor se ejecuta en `http://localhost:5000`.
  9. La aplicación se espera que la conexión a la BD se haga en el puerto `27017`.