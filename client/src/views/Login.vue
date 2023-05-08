<template>
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
        console.log(this.user)
        if (this.username === this.user.username && this.password === this.user.password) {
          localStorage.setItem('user', JSON.stringify(this.user));
          this.$router.push('/userPage');
        } else {
          this.error = 'Invalid username or password';
        }
      },
    },
  };
  </script>
  
  <style scoped>
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