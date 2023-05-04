<template>
  <div class="home-page">
    <h1>Bienvenido a la aplicación de aprendizaje de Vue</h1>
    <p>Aquí encontrarás ejercicios y tutoriales para ayudarte a aprender Vue</p>
    <p>Nuestra aplicación incluye:</p>
    <ul>
      <li>Ejercicios interactivos para ayudarte a practicar conceptos de Vue</li>
      <li>Tutoriales y guías para explicar las características y las mejores prácticas de Vue</li>
      <li>Un foro comunitario donde puedes conectarte con otros aprendices de Vue</li>
    </ul>
    <p>Como parte de nuestro compromiso de proporcionar la mejor experiencia de aprendizaje posible, actualmente estamos trabajando en integrar ChatGPT con nuestro sistema de corrección de ejercicios. Esto nos permitirá brindar retroalimentación más personalizada a nuestros usuarios, basada en sus errores y equivocaciones específicos.</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-size: 1.2rem;
}

ul {
  list-style: disc;
  margin-left: 2rem;
}

li {
  margin-bottom: 0.5rem;
}
</style>
