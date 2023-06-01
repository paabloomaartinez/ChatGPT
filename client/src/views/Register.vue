<template>
    <div class="base-wireframe">
      <header>
        <h1 class="titulo"><router-link to="/" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
    </header>
    <main>
      <div class="register-page">
        <h1 class="register-title">Registrarse</h1>
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
        <div class="registrarse-button">
          <button type="submit" @click.prevent="register">Registrarse</button>
        </div>
        
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

main {
  flex: 1;
  padding: 1rem;
}
  .register-page {
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
  input[type="email"],
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

.register-title {
  color: #2e373f;
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.registrarse-button {
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
  