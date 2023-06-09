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
            <h2>Métodos en Vue</h2>
            <p>Vue.js es un framework de JavaScript que facilita la construcción de interfaces de usuario interactivas. A continuación, se presentan algunos de los principales métodos utilizados en Vue:</p>
            
            <h3>created()</h3>
            <p>El método <code>created()</code> se ejecuta una vez que se ha creado la instancia de Vue. Aquí es donde puedes realizar tareas de inicialización, como obtener datos del servidor o configurar observadores.</p>
            
            <h3>mounted()</h3>
            <p>El método <code>mounted()</code> se ejecuta después de que la instancia de Vue se haya montado en el DOM. Es útil para realizar operaciones que requieren acceso a los elementos del DOM, como inicializar bibliotecas externas o configurar eventos.</p>
            
            <h3>computed</h3>
            <p>Las propiedades computadas, definidas dentro del objeto <code>computed</code>, son funciones que calculan y devuelven un valor basado en otros datos reactivos de Vue. Estas propiedades se almacenan en caché y se actualizan automáticamente cuando cambian sus dependencias.</p>
            
            <h3>methods</h3>
            <p>El objeto <code>methods</code> contiene los métodos que se pueden llamar desde la instancia de Vue o desde los eventos del DOM. Puedes definir funciones para realizar acciones específicas, como manipular datos o interactuar con el DOM.</p>
            
            <h3>watch</h3>
            <p>El objeto <code>watch</code> permite realizar un seguimiento de los cambios en los datos reactivos y ejecutar funciones en respuesta a esos cambios. Puedes observar cambios específicos en propiedades y realizar tareas adicionales, como realizar solicitudes HTTP o actualizar otras propiedades.</p>
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
  name: 'Métodos',
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
      this.preguntasGenerales = await QUESTIONS.getQuestions({"titulo":"metodos"})
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
            this.$router.push('/Directivas')
          }
          
        } else {
          this.respuestaCorrecta[preguntaIndex + '-' + respuestaIndex] = false;
        }
    },
    async subirNivel() {
      let userData = localStorage.getItem('user')
      let user = JSON.parse(userData)
      await API.setLevel(user[0].username, {'level':"Principiante",'content':[
        { numero: 1, nombre: 'Fundamentos', enable: true},
        { numero: 2, nombre: 'Directivas', enable: true },
        { numero: 3, nombre: 'Metodos', enable: false },
        { numero: 4, nombre: 'Eventos', enable: false },
        { numero: 5, nombre: 'Componentes', enable: false },
        { numero: 6, nombre: 'Plantillas', enable: false },
        { numero: 7, nombre: 'Routing', enable: false },
        { numero: 8, nombre: 'Watchers', enable: false },
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