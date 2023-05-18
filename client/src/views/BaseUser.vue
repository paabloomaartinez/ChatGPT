<template>
  <div class="base-wireframe">
    <header>
        <h1 class="titulo"><router-link to="/userPage" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
      <nav>
        <ul>
          <li><router-link to="/logout" @click="logout">Logout</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <div class="userPage">
        <h1>Bienvenid@, {{ username }}!</h1>
        <h2>Tu nivel es: {{ level }}</h2>
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
      level:''
    };
  },
  mounted() {
    this.obtenerDatos()
  },
  methods: {
    obtenerDatos() {
      const usuario = JSON.parse(localStorage.getItem('user'));

      if (usuario) {
        this.username = usuario[0].username
        this.level = usuario[0].level
      }
    },
    logout() {
      // Eliminar los datos del localStorage
      localStorage.clear();

      // Redirigir a la ruta "/logout"
      this.$router.push('/logout');
    },
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