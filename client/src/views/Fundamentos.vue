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
            <h2>Fundamentos de Vue</h2>
            <p>
                Vue.js es un framework progresivo para la construcción de interfaces de usuario. Permite crear componentes reutilizables y construir aplicaciones web de una manera declarativa y eficiente.
            </p>
            <p>
                Algunos conceptos fundamentales de Vue son:
            </p>
            <ul>
                <li>
                <strong>Componentes:</strong> Los componentes son bloques de construcción de Vue que encapsulan HTML, CSS y JavaScript para formar partes reutilizables y autónomas de una aplicación. Los componentes pueden tener su propio estado, propiedades y métodos.
                </li>
                <li>
                <strong>Directivas:</strong> Las directivas son atributos especiales que se aplican a los elementos HTML para agregar comportamiento dinámico a la página. Ejemplos de directivas son v-bind, v-if y v-for.
                </li>
                <li>
                <strong>Reactividad:</strong> Vue utiliza un sistema de reactividad para rastrear los cambios en los datos y actualizar automáticamente la interfaz de usuario. Esto significa que los cambios en los datos se reflejan de forma automática en la vista sin necesidad de manipulación manual del DOM.
                </li>
                <li>
                <strong>Ciclo de vida:</strong> Los componentes de Vue tienen diferentes etapas de ciclo de vida, como la creación, montaje, actualización y destrucción. Estas etapas ofrecen ganchos de ciclo de vida que permiten ejecutar código en momentos específicos durante el ciclo de vida del componente.
                </li>
                <li>
                <strong>Vue Router:</strong> Vue Router es la biblioteca de enrutamiento oficial de Vue.js. Permite crear rutas en la aplicación y asociarlas con componentes específicos para habilitar la navegación entre diferentes vistas.
                </li>
            </ul>
            <p>
                Para comenzar a construir una aplicación con Vue, se siguen estos pasos básicos:
            </p>
            <ol>
                <li>
                <strong>Instalación:</strong> Se debe incluir Vue.js en el proyecto. Esto se puede hacer descargando el archivo de Vue.js y agregándolo al proyecto, o utilizando un administrador de paquetes como npm o yarn para instalar Vue.js.
                </li>
                <li>
                <strong>Creación del componente raíz:</strong> En el archivo HTML principal de la aplicación, se crea un contenedor donde se montará la aplicación Vue. Esto se hace utilizando la directiva v-app o seleccionando un elemento existente para convertirlo en el contenedor de la aplicación.
                </li>
                <li>
                <strong>Definición de componentes:</strong> Se definen los componentes necesarios para la aplicación. Cada componente tiene su propio archivo con su estructura de HTML, CSS y JavaScript, y se pueden importar y utilizar dentro de otros componentes.
                </li>
                <li>
                <strong>Instancia de Vue:</strong> Se crea una instancia de Vue en el archivo JavaScript principal de la aplicación, proporcionando opciones de configuración como el componente raíz, las rutas (si se utiliza Vue Router) y los datos iniciales.
                </li>
                <li>
                <strong>Montaje:</strong> Finalmente, se monta la instancia de Vue en el contenedor especificado en el paso 2, lo que hace que la aplicación Vue se inicie y se muestre en el navegador.
                </li>
            </ol>
            <p>
                Esta es solo una introducción a los fundamentos de Vue y a los pasos básicos para crear una aplicación. Para obtener más información detallada sobre cada uno de estos aspectos, se recomienda consultar la documentación oficial de Vue.js.
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
  name: 'Fundamentos',
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
  