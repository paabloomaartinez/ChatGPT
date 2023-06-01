<template>
    <div class="base-wireframe">
      <header>
        <h1 class="titulo"><router-link to="/" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
    </header>
    <main>
      <div class="login-page">
        <h1 class="login-title">Login</h1>
        <form>
          <label>
            Nombre de usuario:
            <input type="text" v-model="username" required>
          </label>
          <label>
            Contraseña:
            <input type="password" v-model="password" required>
          </label>
          <div class="login-button">
            <button type="submit" @click.prevent="login">Log In</button>
          </div>
          
          <div v-if="error" class="error">{{ error }}</div>
          <div>
            <p class="pregunta-registrar">¿Aún no estás registrado? </p>
            <router-link to="/register" class="registrar">Regístrate aquí</router-link></div>
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
  import bcrypt from 'bcryptjs';
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
      hashPassword(password) {
        const salt = bcrypt.genSaltSync(10); // Generar una sal (salt)
        const hashedPassword = bcrypt.hashSync(password, salt); // Aplicar función hash a la contraseña

        return hashedPassword;
      },
      async login() {
        this.user = await API.getUserById(this.username)
        if (this.user[0] === undefined) {
          this.error = 'No existe un usuario con el nombre de usuario indicado.';
        }else if (this.username === this.user[0].username && bcrypt.compareSync(this.password, this.user[0].password)) {
          localStorage.setItem('user', JSON.stringify(this.user));
          this.$router.push('/login/ok');
        } else {
          this.error = 'Nombre de usuario o contraseña no validos.';
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
  background: linear-gradient(to bottom right, #afe4cc, #cbe9db);
}

header {
  background-color: #2e373f;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

footer {
  background-color: #2e373f;
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

.login-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #d7faee9a;
  border: 1px solid #ffffff;
  border-radius: 16px;
  box-shadow: 0 7px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  animation: dropdown 1s ease-out;
}

@keyframes dropdown {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
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
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button[type="submit"] {
  padding: 0.5rem;
  background-color: #2e373f;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4e575f;
}

button:active {
  background-color: #1d2124;
}

.login-title {
  color: #2e373f;
  display: flex;
  font-size: 2.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pregunta-registrar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.registrar {
  color: rgb(33, 108, 170);
  font-size: 1rem;
  text-decoration:underline;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
    font-size: 1rem;
    display: flex;
    justify-content: center;
}

.error {
  color: red;
  animation: rumble 1s;
}

@keyframes rumble {
  0% {
    opacity: 0;
    transform: translateX(-60px);
  }
  50% {
    opacity: 1;
    transform: translateX(0px);
  }
  60% {
    opacity: 1;
    transform: translateX(8px);
  }
  70% {
    opacity: 1;
    transform: translateX(-8px);
  }
  80% {
    opacity: 1;
    transform: translateX(4px);
  }
  90% {
    opacity: 1;
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0px);
  }
}

</style>  