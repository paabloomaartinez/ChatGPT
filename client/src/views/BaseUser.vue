<template>
  <div class="userPage">
    <h1>Bienvenid@, {{ username }}!</h1>
    <h2>Tu nivel es: {{ level }}</h2>
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
    }
  }
};
</script>
