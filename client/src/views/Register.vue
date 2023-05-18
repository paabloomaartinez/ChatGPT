<template>
    <div class="base-wireframe">
      <header>
        <h1 class="titulo"><router-link to="/" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
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
  import bcrypt from 'bcryptjs';
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
      hashPassword(password) {
        const salt = bcrypt.genSaltSync(10); // Generar una sal (salt)
        const hashedPassword = bcrypt.hashSync(password, salt); // Aplicar función hash a la contraseña

        return hashedPassword;
      },
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
          password: this.hashPassword(this.password),
        });
        if (response.error) {
          this.error = response.error;
          return;
        }
        localStorage.setItem('user', JSON.stringify([{'username': this.username, 'email': this.email, 'password': this.hashPassword(this.password)}]))
        this.$router.push("/initialQuestion");
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
  