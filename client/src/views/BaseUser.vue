<template>
  <div class="base-wireframe">
    <header>
      <h1 class="titulo"><router-link to="/userPage" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
      <nav>
        <ul>
          <li><router-link to="/chat">Chat</router-link></li>
          <li><router-link to="/logout" @click="logout">Logout</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <div class="userPage">
        <div class="menu">
          <ul>
            <li v-for="(nivel, index) in niveles" :key="index">
              Nivel {{ nivel.numero }}: {{ nivel.nombre }}
            </li>
          </ul>
        </div>
        <div class="content">
          <h1>Bienvenid@, {{ username }}!</h1>
          <h2>Tu nivel es: {{ level }}</h2>
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
      niveles: [
        { numero: 1, nombre: 'Fundamentos' },
        { numero: 2, nombre: 'Directivas' },
        { numero: 3, nombre: 'Eventos' },
        { numero: 4, nombre: 'Eventos' },
        { numero: 5, nombre: 'Componentes' },
        { numero: 6, nombre: 'Plantillas' },
        { numero: 7, nombre: 'Routing' },
        { numero: 8, nombre: 'Watchers' },
        { numero: 9, nombre: 'Animation' },
        { numero: 10, nombre: 'Build' },
        { numero: 11, nombre: 'Deployment' }
      ]
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

.titulo-link {
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

</style>