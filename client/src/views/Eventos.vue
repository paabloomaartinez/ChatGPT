<template>
    <div class="base-wireframe">
      <header>
        <h1 class="titulo"><router-link to="/userPage" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
        <nav>
          <ul>
            <li><router-link to="/chat">Generador de Preguntas</router-link></li>
            <li><router-link to="/logout" @click="logout">Logout</router-link></li>
          </ul>
        </nav>
      </header>
      <main>
        <div class="userPage">
          <div class="menu">
            <ul>
              <li v-for="(nivel, index) in niveles" :key="index" :class="{ 'no-seleccionable': !nivel.enable }">
                <a v-if="nivel.enable" :href="`/${nivel.nombre}`">Nivel {{ nivel.numero }}: {{ nivel.nombre }}</a>
                <span v-else>Nivel {{ nivel.numero }}: {{ nivel.nombre }}</span>
              </li>
            </ul>
          </div>
          <div class="content">
            <h2>Eventos en Vue</h2>
            <p>En Vue, los eventos son una forma de comunicación entre componentes. Puedes escuchar eventos en componentes padres o emitir eventos desde componentes hijos.</p>
            <p>Para escuchar un evento, puedes utilizar la directiva <code>@</code> o <code>v-on</code> seguido del nombre del evento y el método que se ejecutará cuando ocurra el evento. Por ejemplo:</p>
            <pre><code>&lt;button @click="handleClick"&gt;Click me!&lt;/button&gt;</code></pre>
            <p>En este caso, cuando el botón sea clicado, el método <code>handleClick</code> se ejecutará.</p>
            <p>Para emitir un evento desde un componente hijo, se utiliza el método <code>$emit</code>. Por ejemplo:</p>
            <pre><code>methods: {
    handleClick() {
        this.$emit('evento-personalizado');
    }
}</code></pre>
            <p>En el componente padre, puedes escuchar este evento utilizando la directiva <code>@</code> o <code>v-on</code> y especificando el nombre del evento y el método que se ejecutará. Por ejemplo:</p>
            <pre><code>&lt;mi-componente @evento-personalizado="handleEvento"&gt;&lt;/mi-componente&gt;</code></pre>
            <p>En este caso, cuando se emita el evento "evento-personalizado" desde el componente hijo, el método <code>handleEvento</code> en el componente padre se ejecutará.</p>
            <p>Los eventos en Vue permiten la comunicación efectiva y el intercambio de información entre componentes, lo que facilita el desarrollo de aplicaciones interactivas y dinámicas.</p>
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2023 ChatGPT - Learning Vue</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Eventos',
  data() {
    return {
      username: '',
      level: '',
      niveles: []
    };
  },
  mounted() {
    this.obtenerDatos();
  },
  methods: {
    obtenerDatos() {
      const usuario = JSON.parse(localStorage.getItem('user'));

      if (usuario) {
        this.username = usuario[0].username;
        this.level = usuario[0].level;
        this.niveles = usuario[0].content
      }
    },
    logout() {
      // Eliminar los datos del localStorage
      localStorage.clear();

      // Redirigir a la ruta "/logout"
      this.$router.push('/logout');
    }
  }
};
</script>

<style>
.titulo {
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

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin-bottom: 1rem;
  list-style: none;
}

.userPage {
  display: flex;
}

.menu {
  flex: 0 0 auto;
  height: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  text-decoration: none;
}

.content {
  flex: 1;
  margin-left: 10rem;
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

.no-seleccionable {
  pointer-events: none;
  opacity: 0.6;
  cursor: not-allowed;
}
</style>