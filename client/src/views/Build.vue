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
          <h2>Build en Vue</h2>
        <p>
            Vue es un framework progresivo para la construcción de interfaces de usuario. Su arquitectura se basa en componentes reutilizables y reactividad declarativa. La construcción en Vue se realiza combinando estos componentes para formar una aplicación completa.
        </p>
        <p>
            En Vue, los componentes son bloques autónomos de funcionalidad y presentación. Cada componente encapsula su propio estado y comportamiento, lo que permite desarrollar de manera modular y escalable. Además, los componentes pueden comunicarse entre sí a través de propiedades y eventos, lo que facilita la construcción de aplicaciones complejas.
        </p>
        <p>
            La construcción en Vue se realiza mediante la creación de archivos de componentes (.vue) que contienen el código HTML, CSS y JavaScript necesarios para ese componente en particular. Estos archivos se pueden reutilizar y componer entre sí para construir la interfaz de usuario completa de la aplicación.
        </p>
        <p>
            Para utilizar un componente en Vue, se puede importar en el archivo principal de la aplicación y luego se puede utilizar como una etiqueta HTML personalizada en el código. Por ejemplo, si tenemos un componente llamado "MiComponente", podemos utilizarlo en el código de la siguiente manera:
        </p>
        <pre>
            <code>
            &lt;template&gt;
                &lt;div&gt;
                &lt;mi-componente&gt;&lt;/mi-componente&gt;
                &lt;/div&gt;
            &lt;/template&gt;
            &lt;script&gt;
                import MiComponente from './MiComponente.vue';

                export default {
                    components: {
                        MiComponente
                    }
                };
            &lt;/script&gt;
            </code>
        </pre>
        <p>
            La construcción en Vue también se beneficia de la reactividad declarativa. Esto significa que los componentes pueden actualizar automáticamente su estado y la interfaz de usuario se actualiza de manera eficiente para reflejar estos cambios. En lugar de manipular directamente el DOM, se puede definir el estado y las dependencias, y Vue se encarga de mantener todo sincronizado de manera eficiente.
        </p>
        <p>
            En resumen, la construcción en Vue se basa en la creación de componentes reutilizables y la composición de estos componentes para construir una aplicación completa. Esta arquitectura modular y reactiva permite un desarrollo eficiente y escalable de interfaces de usuario interactivas y modernas.
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
  name: 'Routing',
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