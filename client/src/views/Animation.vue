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
            <h2>Animación en Vue</h2>
            
            <p>
                Vue proporciona herramientas poderosas para agregar animación a tus aplicaciones web. Con las características de transición y animación de Vue, puedes crear experiencias de usuario suaves y atractivas.
            </p>
            
            <h3>Transiciones</h3>
            
            <p>
                El componente de transición de Vue te permite animar elementos cuando se insertan, actualizan o eliminan del DOM. Admite transiciones basadas en CSS y transiciones basadas en JavaScript.
            </p>
            
            <p>
                Para usar transiciones, debes envolver el elemento que deseas animar con el componente `&lt;transition&gt;`. Puedes especificar el tipo de transición utilizando clases CSS o hooks de JavaScript.
            </p>
            
            <h4>Transiciones CSS</h4>
            
            <p>
                Las transiciones CSS son la forma más sencilla de agregar animación a tus componentes de Vue. Puedes definir los estilos de transición utilizando clases CSS y Vue los aplicará automáticamente cuando el elemento entre o salga del DOM.
            </p>
            
            <pre><code>
                &lt;transition name="fade"&gt;
                    &lt;div v-if="show"&gt;Contenido para animar&lt;/div&gt;
                &lt;/transition&gt;
            </code></pre>
            
            <p>
                En el ejemplo anterior, la clase `fade` define los estilos de transición. Cuando la variable `show` es verdadera, el contenido se desvanecerá. Cuando la variable `show` se vuelve falsa, el contenido se desvanecerá.
            </p>
            
            <h4>Transiciones JavaScript</h4>
            
            <p>
                Si necesitas más control sobre la animación, puedes utilizar los hooks de JavaScript proporcionados por Vue. Estos hooks te permiten definir animaciones personalizadas utilizando código JavaScript.
            </p>
            
            <pre><code>
                &lt;transition
                    name="custom-animation"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter"
                &gt;
                    &lt;div v-if="show"&gt;Contenido para animar&lt;/div&gt;
                &lt;/transition&gt;
            </code></pre>
            
            <p>
                En este ejemplo, los métodos `beforeEnter`, `enter` y `afterEnter` definen la lógica de animación personalizada. Puedes utilizar CSS, JavaScript o bibliotecas de animación externas para crear animaciones complejas.
            </p>
            
            <h3>Animaciones</h3>
            
            <p>
                Además de las transiciones, Vue también proporciona la capacidad de crear animaciones. Las animaciones son similares a las transiciones pero permiten efectos más complejos e interactivos. Puedes usar animaciones para crear interfaces de usuario dinámicas y dar vida a tus aplicaciones web.
            </p>
            
            <p>
                Para utilizar animaciones en Vue, puedes usar el componente `&lt;transition-group&gt;`. Este componente te permite aplicar animaciones a una lista de elementos y controlar su aparición, eliminación y reordenamiento.
            </p>
            
            <p>
                Las animaciones en Vue se pueden implementar utilizando CSS, JavaScript o una combinación de ambos. Puedes definir los estilos de animación utilizando keyframes CSS o utilizar hooks de JavaScript para controlar el proceso de animación.
            </p>
            
            <h4>Usando Animaciones CSS</h4>
            
            <p>
                Las animaciones CSS proporcionan una forma poderosa de crear efectos dinámicos y visualmente atractivos en Vue. Puedes definir keyframes de animación utilizando CSS y aplicarlos a elementos dentro de un componente `&lt;transition-group&gt;`.
            </p>
            
            <pre><code>
                &lt;transition-group name="list-animation" tag="ul"&gt;
                    &lt;li v-for="item in items" :key="item.id"&gt;&#123;&#123; item.text &#125;&#125;&lt;/li&gt;
                &lt;/transition-group&gt;
            </code></pre>
            
            <p>
                En este ejemplo, la clase `list-animation` define los estilos de animación. Cuando se agregan o eliminan elementos del arreglo `items`, Vue aplicará la animación a los elementos de la lista.
            </p>
            
            <h4>Usando Animaciones JavaScript</h4>
            
            <p>
                Si necesitas más control sobre el proceso de animación, puedes utilizar animaciones JavaScript en Vue. Al definir la lógica de animación personalizada utilizando código JavaScript, puedes crear efectos dinámicos e interactivos.
            </p>
            
            <pre><code>
                &lt;transition-group
                    name="list-animation"
                    tag="ul"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter"
                &gt;
                    &lt;li v-for="item in items" :key="item.id"&gt;&#123;&#123; item.text &#125;&#125;&lt;/li&gt;
                &lt;/transition-group&gt;
            </code></pre>
            
            <p>
                En este ejemplo, los métodos `beforeEnter`, `enter` y `afterEnter` definen la lógica de animación personalizada. Puedes utilizar frameworks o bibliotecas de JavaScript como GSAP o Anime.js para crear animaciones complejas.
            </p>
            
            <p>
                Con las características de transición y animación de Vue, tienes la flexibilidad de crear interfaces de usuario impresionantes e interactivas. Experimenta con diferentes técnicas de animación y encuentra la mejor manera de cautivar a tus usuarios.
            </p>
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
  name: 'Animation',
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