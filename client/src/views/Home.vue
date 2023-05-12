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
      <div class="home-page">
        <h1>Bienvenid@ a la aplicación de aprendizaje de Vue</h1>
        <p>Aquí encontrarás ejercicios y tutoriales para ayudarte a aprender Vue</p>
        <p>Nuestra aplicación incluye:</p>
        <ul>
          <li>Ejercicios interactivos para ayudarte a practicar conceptos de Vue</li>
          <li>Tutoriales y guías para explicar las características y las mejores prácticas de Vue</li>
          <li>Un foro comunitario donde puedes conectarte con otros aprendices de Vue</li>
        </ul>
        <p>Como parte de nuestro compromiso de proporcionar la mejor experiencia de aprendizaje posible, actualmente ChatGPT está integrado en nuestro sistema de corrección de ejercicios. Esto nos permite brindar retroalimentación más personalizada a nuestros usuarios, basada en sus errores y equivocaciones específicos.</p>
      </div>
    </main>
    <footer>
      <p>&copy; 2023 ChatGPT - Learning Vue</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
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
.home-page {
  margin: 0 auto;
  padding: 2rem;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: sans-serif;
}

ul {
  list-style: disc;
  margin-left: 2rem;
}

li {
  margin-bottom: 0.5rem;
}

</style>
