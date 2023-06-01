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
      </main>
      <footer>
        <p>&copy; 2023 ChatGPT - Learning Vue</p>
    </footer>
  </div>
</template>

<script>
import QUESTIONS from "../controllers/preguntasNiveles"
import API from "../controllers/login"
export default {
  name: 'Animation',
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
      this.preguntasGenerales = await QUESTIONS.getQuestions({"titulo":"animation"})
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
            this.$router.push('/Build')
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
        { numero: 9, nombre: 'Animation', enable: true },
        { numero: 10, nombre: 'Build', enable: true },
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