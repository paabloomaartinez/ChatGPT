<template>
    <div class="base-wireframe">
      <header>
        <h1 class="titulo"><router-link to="/" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
      <nav>
        <ul>
          <li><router-link to="/login">Login</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <div class="register-page">
        <h1>Registrarse</h1>
      <form>
        <label>
          Nombre de usuario:
          <input type="text" v-model="username" required>
        </label>
        <label>
          Correo Electrónico:
          <input type="email" v-model="email" required>
        </label>
        <label>
          Contraseña:
          <input type="password" v-model="password" required>
        </label>
        <label>
          Confirma la Contraseña:
          <input type="password" v-model="confirmPassword" required>
        </label>
        <button type="submit" @click.prevent="register">Registrarse</button>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
      </div>
    </main>
    <footer>
      <p>&copy; 2023 ChatGPT - Learning Vue</p>
    </footer>
    </div>
  </template>
  
  <script>
  import API from "../controllers/login";
  
  export default {
    name: "RegisterPage",
    data() {
      return {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: "",
      };
    },
    methods: {
      async register() {
        if (this.username == '' || this.email == '' || this.password == '' || this.confirmPassword == '') {
          this.error = "Rellena todos los campos";
          return;
        }else if (this.password !== this.confirmPassword) {
          this.error = "Las contraseñas no coinciden";
          return;
        }
        const response = await API.addUser({
          username: this.username,
          email: this.email,
          password: this.password,
        });
        if (response.error) {
          this.error = response.error;
          return;
        }
        this.$router.push("/screening");
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
  .register-page {
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
  input[type="email"],
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
  