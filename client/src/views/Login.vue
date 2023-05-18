<template>
    <div class="base-wireframe">
      <header>
        <h1 class="titulo"><router-link to="/" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
    </header>
    <main>
      <div class="login-page">
        <h1>Login</h1>
        <form>
          <label>
            Nombre de usuario:
            <input type="text" v-model="username" required>
          </label>
          <label>
            Contraseña:
            <input type="password" v-model="password" required>
          </label>
          <button type="submit" @click.prevent="login">Log In</button>
          <div v-if="error" class="error">{{ error }}</div>
          <div>¿Aún no estás registrado? <router-link to="/register">Regístrate aquí</router-link></div>
        </form>
      </div>
    </main>
    <footer>
      <p>&copy; 2023 ChatGPT - Learning Vue</p>
    </footer>
    </div>
  </template>
  
  <script>
  import API from "../controllers/login"
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',
        error: '',
        user:{}
      };
    },
    methods: {
      async login() {
        this.user = await API.getUserById(this.username)
        if (this.username === this.user[0].username && this.password === this.user[0].password) {
          localStorage.setItem('user', JSON.stringify(this.user));
          this.$router.push('/login/ok');
        } else {
          this.error = 'Invalid username or password';
        }
      },
    },
  };
  </script>
  
  <style scoped>
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
  .login-page {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  input[type="text"],
  input[type="password"] {
    padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button[type="submit"] {
  padding: 0.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.error {
  color: red;
}
</style>  