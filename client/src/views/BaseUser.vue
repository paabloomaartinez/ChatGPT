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
              <a v-if="nivel.enable" :href="`/${nivel.nombre}`" class="nivel-link">Nivel {{ nivel.numero }}: {{ nivel.nombre }}</a>
              <span v-else>Nivel {{ nivel.numero }}: {{ nivel.nombre }}</span>
            </li>
          </ul>
        </div>
        <div class="content">
          <h1 class="bienvenido">Bienvenid@, {{ username }}!</h1>
          <h2 class="nivel">Tu nivel es: {{ level }}</h2>
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
  name: 'BaseUserPage',
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
  text-decoration: none;
  font-size: 1.5rem;
}

.nivel-link {
  color: #1a1d1f;
  font-size: 1.5rem;
  text-decoration: underline;
}

.no-seleccionable {
  color: #4e555a;
  pointer-events: none;
  opacity: 0.6;
  cursor: not-allowed;
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
  animation: fade-in 1s;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.bienvenido {
  font-size: 5rem;
  color: #2a3036;
}

.nivel{
  font-size: 3rem;
  color: #2a3036;
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

nav li {
  position: relative;
  text-decoration: none;
  margin-right: 1.5rem;
  font-size: 1.5rem;
}

nav li::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #fff;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
  transform-origin: left;
}

nav li:hover::after {
  transform: scaleX(1);
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
  color: #4e555a;
  pointer-events: none;
  opacity: 0.6;
  cursor: not-allowed;
}

</style>