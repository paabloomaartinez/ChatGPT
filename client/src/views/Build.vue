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
          <h2>Build en Vue</h2>
        <p>
            Vue es un framework progresivo para la construcción de interfaces de usuario. Su arquitectura se basa en componentes reutilizables y reactividad declarativa. La construcción en Vue se realiza combinando estos componentes para formar una aplicación completa.
        </p>
        <p>
            En Vue, los componentes son bloques autónomos de funcionalidad y presentación. Cada componente encapsula su propio estado y comportamiento, lo que permite desarrollar de manera modular y escalable. Además, los componentes pueden comunicarse entre sí a través de propiedades y eventos, lo que facilita la construcción de aplicaciones complejas.
        </p>
        <p>
            La construcción en Vue se realiza mediante la creación de archivos de componentes (.vue) que contienen el código HTML, CSS y JavaScript necesarios para ese componente en particular. Estos archivos se pueden reutilizar y componer entre sí para construir la interfaz de usuario completa de la aplicación.
        </p>
        <p>
            Para utilizar un componente en Vue, se puede importar en el archivo principal de la aplicación y luego se puede utilizar como una etiqueta HTML personalizada en el código. Por ejemplo, si tenemos un componente llamado "MiComponente", podemos utilizarlo en el código de la siguiente manera:
        </p>
        <pre>
            <code>
            &lt;template&gt;
                &lt;div&gt;
                &lt;mi-componente&gt;&lt;/mi-componente&gt;
                &lt;/div&gt;
            &lt;/template&gt;
            &lt;script&gt;
                import MiComponente from './MiComponente.vue';

                export default {
                    components: {
                        MiComponente
                    }
                };
            &lt;/script&gt;
            </code>
        </pre>
        <p>
            La construcción en Vue también se beneficia de la reactividad declarativa. Esto significa que los componentes pueden actualizar automáticamente su estado y la interfaz de usuario se actualiza de manera eficiente para reflejar estos cambios. En lugar de manipular directamente el DOM, se puede definir el estado y las dependencias, y Vue se encarga de mantener todo sincronizado de manera eficiente.
        </p>
        <p>
            En resumen, la construcción en Vue se basa en la creación de componentes reutilizables y la composición de estos componentes para construir una aplicación completa. Esta arquitectura modular y reactiva permite un desarrollo eficiente y escalable de interfaces de usuario interactivas y modernas.
        </p>
      </div>
        </div>
        <div class="questions">
          <div v-for="(question, index) in preguntasGenerales.questions" :key="index" class="question" v-show="index === currentQuestionIndex">
            <h2>{{ question.tipo }}</h2>
            <div v-if="question.tipo === 'test'">
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
                <button @click="corregirTest(preguntaIndex, pregunta.respuesta)">Corregir</button>
              </div>
            </div>
            <div v-else-if="question.tipo === 'verdadero_falso'">
              <div v-for="(pregunta, preguntaIndex) in question.preguntas" :key="preguntaIndex" class="true-false-question">
                <p>{{ pregunta.pregunta }}</p>
                <input type="text" v-model="respuestas[preguntaIndex]" placeholder="Ingresa tu respuesta">
                <button @click="corregirVerdaderoFalso(pregunta, preguntaIndex)">Corregir</button>
              </div>
            </div>
            <div v-else-if="question.tipo === 'completar_codigo'">
              <div v-for="(pregunta, preguntaIndex) in question.preguntas" :key="preguntaIndex" class="code-completion-question">
                <p>{{ pregunta.pregunta }}</p>
                <code>{{ pregunta.codigo }}</code>
                <div v-for="(respuesta, respuestaIndex) in pregunta.respuesta_correcta" :key="respuestaIndex">
                  <input type="text" v-model="respuestas_usuario[preguntaIndex + '-' + respuestaIndex]" placeholder="Ingresa tu respuesta">
                  <button @click="corregirCompletarCodigo(pregunta, preguntaIndex, respuestaIndex)">Enviar</button>                 
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
      respuestas : []
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
      this.preguntasGenerales = await QUESTIONS.getQuestions({"titulo":"build"})
      console.log(this.preguntasGenerales)
    },
    corregirTest(preguntaIndex, respuesta) {
      const pregunta = this.preguntasGenerales.questions[this.currentQuestionIndex].preguntas[preguntaIndex];
      if (pregunta.opciones[pregunta.respuesta_correcta] == respuesta){
        //mensaje que quieras q aparezca cuando cacie
        console.log("correcto")
        this.contador++
        if (this.preguntasGenerales.questions[this.currentQuestionIndex].preguntas.length == this.contador){
          //Hacer que cargen las siguientes preguntas de otro tipo y bloquear la pregunta respondida
          console.log("Todas las preguntas tipo test acertadas")
          this.contador = 0
          this.currentQuestionIndex++
        } 
        
      }
      else {
        console.log("incorrecto")
        //mensaje que quiera q aparezca cuando falla
      }

    },
    corregirVerdaderoFalso(pregunta, preguntaIndex) {   
      if (pregunta.respuesta_correcta == this.respuestas[preguntaIndex]){
        //mensaje de que ha acertado
        console.log("Correcto")
        this.contador++
        if (this.preguntasGenerales.questions[this.currentQuestionIndex].preguntas.length == this.contador){
          //Hacer que cargen las siguientes preguntas de otro tipo y bloquear la pregunta respondida
          console.log("Todas las preguntas tipo verdadero/falso acertadas")
          this.contador = 0
          this.currentQuestionIndex++
        } 
      }
      else {
        //Mensaje de que ha fallado
        console.log("Error")
      }

    },
    corregirCompletarCodigo(pregunta, preguntaIndex, respuestaIndex) {
      const respuesta_usuario = this.respuestas_usuario[preguntaIndex + '-' + respuestaIndex];
      console.log(preguntaIndex + '-' + respuestaIndex)
        if (pregunta.respuesta_correcta.includes(respuesta_usuario)) {
          // Mensaje de que ha acertado
          console.log("Correcto");
          this.contador++
          if (this.contador == this.preguntasGenerales.respuestas_posibles){
            //Lo que quieras hacer cuando haya acertado todas
          }
          
        } else {
         // Mensaje de que ha fallado
          console.log("Error");
        }
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