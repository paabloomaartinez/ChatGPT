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
            <h2>Watchers en Vue</h2>
            <p>
                En Vue, los <b>watchers</b> son una característica fundamental para reaccionar a los cambios en los datos y realizar acciones específicas cuando esos cambios ocurren. Los watchers nos permiten observar y responder a cambios en propiedades de datos y ejecutar lógica personalizada en consecuencia.
            </p>
            <p>
                Para utilizar los watchers en un componente Vue, simplemente definimos una propiedad llamada <b>watch</b> en el objeto de opciones del componente. Dentro de esta propiedad, podemos especificar una o varias propiedades de datos que deseamos observar y una función de <b>callback</b> que se ejecutará cada vez que se produzca un cambio en alguna de estas propiedades.
            </p>
            <pre>
            watch: {
              nombrePropiedad: function(nuevoValor, antiguoValor) {
                // Lógica personalizada a ejecutar cuando la propiedad cambie
              }
            }</pre>
            <p>
                El <b>watcher</b> recibe dos argumentos: el <b>nuevoValor</b> y el <b>antiguoValor</b> de la propiedad observada. Estos valores permiten comparar y tomar decisiones en base a los cambios ocurridos. Por ejemplo, podemos realizar una llamada a una API cuando un valor específico cambie, actualizar otras propiedades dependientes o realizar cálculos complejos.
            </p>
            <p>
                Es importante tener en cuenta que los watchers son reactivos, lo que significa que se actualizan automáticamente cuando cambia la propiedad observada. Esto hace que los watchers sean una herramienta poderosa para gestionar lógica de forma declarativa y mantener los componentes sincronizados con los datos subyacentes.
            </p>
            <p>
                Además, Vue también proporciona una sintaxis más simplificada para los watchers utilizando <b>watchers en línea</b> o <b>computed watchers</b>. Los watchers en línea se pueden utilizar directamente dentro del objeto de opciones del componente, mientras que los computed watchers son funciones computadas que se actualizan automáticamente en función de las dependencias observadas.
            </p>
            <p>
                En resumen, los watchers son una característica poderosa de Vue que nos permiten reaccionar a los cambios en los datos y ejecutar lógica personalizada en respuesta a estos cambios. Utilizando watchers, podemos mantener nuestros componentes sincronizados y realizar acciones específicas cuando sea necesario, lo que contribuye a un desarrollo más eficiente y escalable en Vue.
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
  name: 'Watchers',
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
      this.preguntasGenerales = await QUESTIONS.getQuestions({"titulo":"watchers"})
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