<template>
    <div class="login-page">
      <h1>Login</h1>
      <form>
        <label>
          Username:
          <input type="text" v-model="username" required>
        </label>
        <label>
          Password:
          <input type="password" v-model="password" required>
        </label>
        <button type="submit" @click.prevent="login">Log In</button>
        <div v-if="error" class="error">{{ error }}</div>
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
        // You can replace this with your own authentication logic
        if (this.username === this.user[0].username && this.password === this.user[0].password) {
          this.$router.push('/about');
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