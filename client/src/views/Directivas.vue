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
            <h2>Directivas en Vue</h2>
            <p>
                Las directivas en Vue son atributos especiales que se utilizan para agregar comportamiento dinámico a los elementos HTML en la interfaz de usuario. Las directivas se indican mediante el prefijo "v-" seguido del nombre de la directiva.
            </p>
            <p>
                Algunas de las directivas más comunes en Vue son:
            </p>
            <ul>
                <li>
                <strong>v-bind:</strong> La directiva v-bind se utiliza para enlazar el valor de una propiedad o atributo HTML al valor de una expresión o propiedad en el componente Vue. Por ejemplo, se puede usar v-bind para enlazar el atributo "href" de un enlace a una propiedad del componente.
                </li>
                <li>
                <strong>v-if y v-show:</strong> Estas directivas se utilizan para controlar la visibilidad de un elemento en función de una expresión. v-if se utiliza para renderizar condicionalmente un elemento en el DOM, mientras que v-show solo cambia la propiedad CSS "display" del elemento para mostrarlo u ocultarlo.
                </li>
                <li>
                <strong>v-for:</strong> La directiva v-for se utiliza para iterar sobre una lista de elementos y renderizar dinámicamente un fragmento de código para cada elemento de la lista. Esto es útil para mostrar listas de datos o generar elementos repetitivos en una plantilla.
                </li>
                <li>
                <strong>v-on:</strong> La directiva v-on se utiliza para escuchar eventos del DOM y ejecutar código en respuesta a ellos. Se puede utilizar para agregar interactividad a la aplicación, como manejar eventos de clic, entrada de datos, teclado, etc.
                </li>
                <li>
                <strong>v-model:</strong> La directiva v-model se utiliza para crear enlaces bidireccionales entre un elemento de formulario (como un campo de entrada) y una propiedad en el componente Vue. Esto facilita la actualización automática de los datos del componente y la sincronización con la entrada del usuario.
                </li>
            </ul>
            <p>
                Estas son solo algunas de las directivas disponibles en Vue. Cada directiva tiene su propia funcionalidad y sintaxis específica. Se recomienda consultar la documentación oficial de Vue.js para obtener una lista completa de directivas y ejemplos de uso.
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
  name: 'Directivas',
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