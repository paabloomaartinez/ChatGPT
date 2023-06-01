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
            <h2>Enrutamiento en Vue</h2>
            <p>
                El enrutamiento es una parte fundamental de las aplicaciones web modernas, y Vue proporciona una manera sencilla y elegante de manejarlo mediante su enrutador oficial, Vue Router.
            </p>
            <p>
                Vue Router es una librería externa para Vue.js que permite navegar entre diferentes vistas dentro de una aplicación de una sola página (SPA). Con Vue Router, puedes definir rutas y mapearlas a componentes específicos. Esto significa que cuando un usuario navega a una determinada ruta, se cargará el componente correspondiente sin tener que recargar la página completa.
            </p>
            <h3>Configuración básica</h3>
            <p>
                Para comenzar a utilizar Vue Router, primero debes instalarlo a través de npm o incluirlo desde un CDN. Luego, importa el paquete y úsalo como un plugin en tu instancia de Vue:
            </p>
            <pre><code>
            import Vue from 'vue';
            import VueRouter from 'vue-router';

            Vue.use(VueRouter);
            </code></pre>
            <p>
                Después de instalar y configurar Vue Router, puedes definir las rutas de tu aplicación. Esto se puede hacer creando una instancia de VueRouter y pasándole un arreglo de objetos de ruta. Cada objeto de ruta define una ruta y el componente asociado que se debe renderizar cuando la ruta coincida.
            </p>
            <pre><code>
            const routes = [
              { path: '/inicio', component: Inicio },
              { path: '/perfil', component: Perfil },
              { path: '/contacto', component: Contacto }
            ];

            const router = new VueRouter({
              routes
            });
            </code></pre>
            <p>
                En el ejemplo anterior, hemos definido tres rutas: "/inicio", "/perfil" y "/contacto". Cuando un usuario navegue a alguna de estas rutas, se renderizará el componente correspondiente.
            </p>
            <h3>Uso en el template</h3>
            <p>
                Para utilizar las rutas en tu template, puedes usar el componente especial <code>&lt;router-view&gt;</code>, que actúa como un marcador de posición donde se renderizará el componente correspondiente a la ruta actual.
            </p>
            <pre><code>
            &lt;template&gt;
            &lt;div&gt;
                &lt;h1&gt;Mi Aplicación&lt;/h1&gt;
                &lt;router-view&gt;&lt;/router-view&gt;
            &lt;/div&gt;
            &lt;/template&gt;
            </code></pre>
            <p>
                En este ejemplo, el componente <code>&lt;router-view&gt;</code> se inserta en el template principal y se encargará de renderizar los componentes correspondientes según la ruta actual.
            </p>
            <h3>Navegación</h3>
            <p>
                Para navegar entre las diferentes rutas de tu aplicación, puedes usar el componente especial <code>&lt;router-link&gt;</code>, que se traduce en un enlace <code>&lt;a&gt;</code> en el DOM. Al hacer clic en un <code>&lt;router-link&gt;</code>, Vue Router se encargará de cambiar la ruta y renderizar el componente correspondiente.
            </p>
            <pre><code>
            &lt;template&gt;
            &lt;div&gt;
                &lt;h1&gt;Mi Aplicación&lt;/h1&gt;
                &lt;router-link to="/inicio"&gt;Inicio&lt;/router-link&gt;
                &lt;router-link to="/perfil"&gt;Perfil&lt;/router-link&gt;
                &lt;router-link to="/contacto"&gt;Contacto&lt;/router-link&gt;
                &lt;router-view&gt;&lt;/router-view&gt;
            &lt;/div&gt;
            &lt;/template&gt;
            </code></pre>
            <p>
                En este ejemplo, cada <code>&lt;router-link&gt;</code> representa un enlace a una ruta específica. Al hacer clic en uno de los enlaces, Vue Router cambiará la URL y renderizará el componente correspondiente.
            </p>
            <p>
                Esto es solo una introducción básica al enrutamiento en Vue utilizando Vue Router. Existen muchas más funcionalidades y opciones disponibles, como rutas anidadas, paso de parámetros, guardias de navegación y más. Puedes consultar la documentación oficial de Vue Router para obtener más información y explorar todas las capacidades que ofrece.
            </p>
            </div>
        </div>
      </main>
      <div class="questions">
          <div v-for="(question, index) in preguntasGenerales.questions" :key="index" class="question" v-show="index === currentQuestionIndex">          
            <div v-if="question.tipo === 'test'">
              <h2>Preguntas tipo Test</h2>
              <h3>Responde a las preguntas tipo test eligiendo la respuesta correcta</h3>
              <div v-for="(pregunta, preguntaIndex) in question.preguntas" :key="preguntaIndex" class="test-question">
                <p>{{ pregunta.pregunta }}</p>
                <ul>
                  <li v-for="(opcion, opcionIndex) in pregunta.opciones" :key="opcionIndex">
                    <label>
                      <input type="radio" :name="'pregunta'+preguntaIndex" :value="opcion" v-model="pregunta.respuesta">
                      {{ opcion }}
                    </label>
                  </li>
                </ul>
                <button @click="corregirTest(preguntaIndex, pregunta.respuesta)" :disabled="pregunta.respuestaCorrecta == true">Corregir</button>
                <p v-if="pregunta.respuestaCorrecta != null"> 
                  {{ pregunta.respuestaCorrecta ? '¡Acierto!' : 'Incorrecto' }}
                </p>
              </div>
            </div>
            <div v-else-if="question.tipo === 'verdadero_falso'">
              <h2>Preguntas de Verdadero/Falso</h2>
              <h3>Responde a las preguntas escribiendo "verdadero" o "falso"</h3>
              <div v-for="(pregunta, preguntaIndex) in question.preguntas" :key="preguntaIndex" class="true-false-question">
                <p>{{ pregunta.pregunta }}</p>
                <input type="text" v-model="respuestas[preguntaIndex]" placeholder="Ingresa tu respuesta">
                <button @click="corregirVerdaderoFalso(pregunta, preguntaIndex)" :disabled="respuestaCorrecta[preguntaIndex] == true">Corregir</button>
                <p v-if="respuestaCorrecta[preguntaIndex] != null"> 
                  {{ respuestaCorrecta[preguntaIndex] ? '¡Acierto!' : 'Incorrecto' }}
                </p>
              </div>
            </div>
            <div v-else-if="question.tipo === 'completar_codigo'">
              <h2>Preguntas de completar codigo</h2>
              <h3>Completa los siguientes codigos escribiendo en orden el cacho que falta en los ...
                Aviso: Si da error en mayuscular prueba en minusculas.
              </h3>
              <div v-for="(pregunta, preguntaIndex) in question.preguntas" :key="preguntaIndex" class="code-completion-question">
                <p>{{ pregunta.pregunta }}</p>
                <code>{{ pregunta.codigo }}</code>
                <div v-for="(respuesta, respuestaIndex) in pregunta.respuesta_correcta" :key="respuestaIndex">
                  <input type="text" v-model="respuestas_usuario[preguntaIndex + '-' + respuestaIndex]" placeholder="Ingresa tu respuesta">
                  <button @click="corregirCompletarCodigo(pregunta, preguntaIndex, respuestaIndex, respuesta)" :disabled="respuestaCorrecta[preguntaIndex + '-' + respuestaIndex] == true">Enviar</button>
                  <p v-if="respuestaCorrecta[preguntaIndex + '-' + respuestaIndex] != null"> 
                  {{ respuestaCorrecta[preguntaIndex + '-' + respuestaIndex] ? '¡Acierto!' : 'Incorrecto' }}
                </p>                 
                </div>
              </div>
            </div>
          </div>
        </div>
      <footer>
        <p>&copy; 2023 ChatGPT - Learning Vue</p>
    </footer>
  </div>
</template>

<script>
import QUESTIONS from "../controllers/preguntasNiveles"
import API from "../controllers/login"
export default {
  name: 'Routing',
  data() {
    return {
      username: '',
      level: '',
      niveles: [],
      preguntasGenerales: {},
      currentQuestionIndex: 0,
      contador: 0,
      respuestas_usuario: {},
      respuestas : [],
      respuestaCorrecta: {}
    };
  },
  mounted() {
    this.obtenerDatos();
    this.obtenerPreguntas();
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
    },
    async obtenerPreguntas() {
      this.preguntasGenerales = await QUESTIONS.getQuestions({"titulo":"routing"})
    },
    corregirTest(preguntaIndex, respuesta) {
      const pregunta = this.preguntasGenerales.questions[this.currentQuestionIndex].preguntas[preguntaIndex];
      if (pregunta.opciones[pregunta.respuesta_correcta] == respuesta){   
        this.contador++
        pregunta.respuestaCorrecta = true;
        if (this.preguntasGenerales.questions[this.currentQuestionIndex].preguntas.length == this.contador){
          this.contador = 0
          this.currentQuestionIndex++
          
        } 
        
      }
      else {
        pregunta.respuestaCorrecta = false;
      }

    },
    corregirVerdaderoFalso(pregunta, preguntaIndex) {   
      if (pregunta.respuesta_correcta == this.respuestas[preguntaIndex]){
        this.contador++
        this.respuestaCorrecta[preguntaIndex] = true;
        if (this.preguntasGenerales.questions[this.currentQuestionIndex].preguntas.length == this.contador){
          this.contador = 0
          this.currentQuestionIndex++
        } 
      }
      else {

        this.respuestaCorrecta[preguntaIndex] = false;
      }

    },
    corregirCompletarCodigo(pregunta, preguntaIndex, respuestaIndex, respuesta) {
      const respuesta_usuario = this.respuestas_usuario[preguntaIndex + '-' + respuestaIndex];
        if (pregunta.respuesta_correcta.includes(respuesta_usuario)) {
          this.respuestaCorrecta[preguntaIndex + '-' + respuestaIndex] = true;
          this.contador++
          if (this.contador == this.preguntasGenerales.respuestas_posibles){
            this.subirNivel()
            this.$router.push('/Watchers')
          }
          
        } else {
          this.respuestaCorrecta[preguntaIndex + '-' + respuestaIndex] = false;
        }
    },
    async subirNivel() {
      let userData = localStorage.getItem('user')
      let user = JSON.parse(userData)
      await API.setLevel(user[0].username, {'level':"Intermedio",'content':[
        { numero: 1, nombre: 'Fundamentos', enable: true},
        { numero: 2, nombre: 'Directivas', enable: true },
        { numero: 3, nombre: 'Metodos', enable: true },
        { numero: 4, nombre: 'Eventos', enable: true },
        { numero: 5, nombre: 'Componentes', enable: true },
        { numero: 6, nombre: 'Plantillas', enable: true },
        { numero: 7, nombre: 'Routing', enable: true },
        { numero: 8, nombre: 'Watchers', enable: true },
        { numero: 9, nombre: 'Animation', enable: false },
        { numero: 10, nombre: 'Build', enable: false },
        { numero: 11, nombre: 'Deployment', enable: false }
      ]})
      let newUser = await API.getUserById(user[0].username)
      localStorage.setItem('user', JSON.stringify(newUser))
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