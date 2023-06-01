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
        <h1 class="bienvenido">Bienvenid@ a la aplicación de aprendizaje de Vue</h1>
        <p class="aqui-encontraras">Aquí encontrarás ejercicios y tutoriales para ayudarte a aprender Vue</p>
        <div class="incluye">
          <p @click="animateList">Nuestra aplicación incluye:</p>
          <ul :class="{ 'animate-list': animate }">
            <li>Ejercicios interactivos para ayudarte a practicar conceptos de Vue.</li>
            <li>Tutoriales y guías para explicar las características y las mejores prácticas de Vue.</li>
            <li>Un generador de preguntas basado en una inteligencia artificial.</li>
          </ul>
        </div>
        <p class="explicacion-final">Como parte de nuestro compromiso de proporcionar la mejor experiencia de aprendizaje posible, actualmente ChatGPT está integrado en nuestro sistema de corrección de ejercicios..</p>
        <p class="explicacion-final">Esto nos permite brindar retroalimentación más personalizada a nuestros usuarios, basada en sus errores y equivocaciones específicos</p>
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
  data() {
    return {
      animate: false,
    };
  },
  methods: {
    animateList() {
      this.animate = !this.animate;
    },
  },
};
</script>

<style scoped>
/* Estilo general */
.base-wireframe {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: sans-serif;
  background: linear-gradient(to bottom right, #afe4cc, #cbe9db);
}

/* Encabezado */
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

.titulo-link {
  color: white;
  font-size: 2.1rem;
  margin-left: 1.5rem;
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
  font-size: 1.5rem;
  text-decoration: none;
}

nav li {
  position: relative;
  text-decoration: none;
  margin-right: 1.5rem;
}

nav a::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #fff;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
  transform-origin: left;
}

nav a:hover::after {
  transform: scaleX(1);
}

/* Contenido principal */
main {
  flex: 1;
  padding: 1rem;
}

.home-page {
  margin: 0 auto;
  padding: 2rem;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: sans-serif;
  text-align: center;
  overflow-y: auto;
  animation: fade-in 1s;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.bienvenido {
  font-size: 5rem;
  color: #2b3846;
  transition: transform 0.3s ease-in-out;
  animation: reduce-space 1s;
}

@keyframes reduce-space {
  0% {
    margin-bottom: 10rem;
  }
  100% {
    margin-bottom: 3.4rem;
  }
}

.aqui-encontraras {
  font-size: 3rem;
  margin-bottom: 8rem;
  color: #4f5358;
}

.incluye {
  margin-bottom: 9rem;
}

.incluye p {
  font-size: 3rem;
  color: #2d3a49;
  margin-bottom: 1rem;
  text-decoration: underline;
}

.incluye ul {
  font-size: 2rem;
  color: #2d3a49;
  text-align: left;
  margin: 0;
  padding: 0;
  list-style: none;
  opacity: 0;
}

.incluye li {
  margin-bottom: 0.5rem;
  color: #4f5358;
}

.explicacion-final {
  font-size: 1.8rem;
  text-align: justify;
  margin-bottom: 0.2rem;
  color: #2b3846;
}

/* Estilos adicionales */
.home-page p,
.home-page h1,
.home-page ul,
.home-page li {
  max-width: 800px;
}

.home-page ul {
  margin-left: 2rem;
}

.home-page li::before {
  content: "•";
  color: #35495E;
  margin-right: 0.5rem;
}

/* Animaciones */
.home-page h1:hover {
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
}

.incluye ul.animate-list {
  animation: slide-down 1s forwards;
}

.incluye ul.reverse-animate-list {
  animation: slide-up 1s forwards;
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}

</style>