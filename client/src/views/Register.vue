<template>
    <div class="register-page">
      <h1>Register</h1>
      <form>
        <label>
          Username:
          <input type="text" v-model="username" required>
        </label>
        <label>
          Email:
          <input type="email" v-model="email" required>
        </label>
        <label>
          Password:
          <input type="password" v-model="password" required>
        </label>
        <label>
          Confirm Password:
          <input type="password" v-model="confirmPassword" required>
        </label>
        <button type="submit" @click.prevent="register">Register</button>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
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
        if (this.password !== this.confirmPassword) {
          this.error = "Passwords do not match";
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
        this.$router.push("/about");
      },
    },
  };
  </script>
  
  <style scoped>
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
  