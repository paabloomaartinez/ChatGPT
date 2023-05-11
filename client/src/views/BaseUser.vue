<template>
  <div class="userPage">
    <h1>Bienvenid@, {{ username }}!</h1>
  </div>
</template>

<script>
export default {
  name: 'BaseUserPage',
  data() {
    return {
      username: ''
    };
  },
  mounted() {
    // Obtener el usuario del localStorage al cargar la página
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
      this.username = user.username;
    }
  }
};
</script>
