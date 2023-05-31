<template>
    <div class="base-wireframe">
      <header>
        <h1 class="titulo"><router-link to="/userPage" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
        <nav>
          <ul>
            <li><router-link to="/chat">Generador de Preguntas</router-link></li>
            <li><router-link to="/logout" @click="logout">Logout</router-link></li>
          </ul>
        </nav>
      </header>
      <main>
        <div class="userPage">
          <div class="menu">
            <ul>
              <li v-for="(nivel, index) in niveles" :key="index" :class="{ 'no-seleccionable': !nivel.enable }">
                <a v-if="nivel.enable" :href="`/${nivel.nombre}`">Nivel {{ nivel.numero }}: {{ nivel.nombre }}</a>
                <span v-else>Nivel {{ nivel.numero }}: {{ nivel.nombre }}</span>
              </li>
            </ul>
          </div>
          <div class="content">
            <h2>Despliegue en Vue</h2>
            <p>
                El despliegue de una aplicación Vue implica ponerla en funcionamiento en un servidor o en un entorno en vivo para que los usuarios puedan acceder a ella a través de Internet. A continuación, te presento algunas opciones comunes para el despliegue de una aplicación Vue:
            </p>

            <h3>1. Despliegue en servidor estático</h3>
            <p>
                Vue permite generar una versión estática de tu aplicación que se puede alojar en cualquier servidor web estático. Esto implica compilar tu código fuente de Vue en archivos HTML, CSS y JavaScript estáticos que se pueden servir directamente desde un servidor web. Este enfoque es ideal para aplicaciones pequeñas o estáticas que no requieren interacciones complejas en el lado del servidor.
            </p>

            <h3>2. Despliegue en servicios de alojamiento en la nube</h3>
            <p>
                Puedes aprovechar servicios de alojamiento en la nube, como AWS (Amazon Web Services), Azure o Firebase, para desplegar tu aplicación Vue. Estos servicios ofrecen diferentes opciones para alojar tu aplicación, como instancias de máquinas virtuales, contenedores o funciones serverless. Puedes elegir la opción que mejor se adapte a tus necesidades y presupuesto.
            </p>

            <h3>3. Despliegue en plataformas de alojamiento específicas para Vue</h3>
            <p>
                Existen plataformas de alojamiento específicas para aplicaciones Vue que simplifican el proceso de despliegue. Algunas de estas plataformas ofrecen integración continua y despliegue continuo (CI/CD) para facilitar la entrega de actualizaciones automáticas a medida que realizas cambios en tu código fuente. Algunas opciones populares incluyen Netlify, Vercel y Surge.sh.
            </p>

            <h3>Consideraciones adicionales</h3>
            <p>
                Independientemente del método de despliegue que elijas, es importante tener en cuenta algunas consideraciones adicionales. Asegúrate de optimizar tu aplicación para el rendimiento, minimizando el tamaño de los archivos y optimizando el tiempo de carga. También debes asegurarte de implementar medidas de seguridad, como el uso de certificados SSL para conexiones seguras y la protección contra ataques comunes.
            </p>

            <p>
                En resumen, el despliegue de una aplicación Vue implica elegir un método de alojamiento adecuado, ya sea en un servidor estático, servicios de alojamiento en la nube o plataformas específicas para Vue. Considera el rendimiento, la seguridad y las necesidades específicas de tu aplicación al seleccionar la mejor opción de despliegue.
            </p>
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2023 ChatGPT - Learning Vue</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Deplyment',
  data() {
    return {
      username: '',
      level: '',
      niveles: []
    };
  },
  mounted() {
    this.obtenerDatos();
  },
  methods: {
    obtenerDatos() {
      const usuario = JSON.parse(localStorage.getItem('user'));

      if (usuario) {
        this.username = usuario[0].username;
        this.level = usuario[0].level;
        this.niveles = usuario[0].content
      }
    },
    logout() {
      // Eliminar los datos del localStorage
      localStorage.clear();

      // Redirigir a la ruta "/logout"
      this.$router.push('/logout');
    }
  }
};
</script>

<style>
.titulo {
  text-decoration: none;
  color: white;
}

.base-wireframe {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: sans-serif;
}

header {
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin-bottom: 1rem;
  list-style: none;
}

.userPage {
  display: flex;
}

.menu {
  flex: 0 0 auto;
  height: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  text-decoration: none;
}

.content {
  flex: 1;
  margin-left: 10rem;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav li:not(:last-child) {
  margin-right: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
}

nav li:hover {
  text-decoration: underline;
}

main {
  flex: 1;
  padding: 1rem;
}

footer {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}

.no-seleccionable {
  pointer-events: none;
  opacity: 0.6;
  cursor: not-allowed;
}
</style>