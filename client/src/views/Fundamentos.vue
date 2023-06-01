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
            <h1>Fundamentos de Vue.js</h1>
            <p>Vue.js es un framework de JavaScript utilizado para construir interfaces de usuario interactivas y basadas en componentes. Está diseñado para ser fácil de usar y comprender, lo que lo convierte en una opción popular para el desarrollo web.</p>
            <h2>Componentes</h2>
            <p>En Vue.js, una aplicación se construye mediante la combinación de componentes reutilizables. Un componente es una instancia reutilizable y autónoma con su propia lógica, estado y vista. Los componentes pueden contener otros componentes, lo que permite crear una jerarquía de componentes compleja y modularizar el desarrollo de la interfaz de usuario.</p>
            <h2>Instancia de Vue</h2>
            <p>Cada componente de Vue.js es una instancia de Vue. Una instancia de Vue se crea mediante la invocación del constructor de Vue y se configura con opciones que definen el comportamiento del componente. Estas opciones incluyen el elemento raíz del componente, los datos, los métodos, las propiedades computadas, los eventos y los ciclos de vida del componente.</p>
            <h2>Template</h2>
            <p>El template define la estructura y la apariencia del componente en Vue.js. Se utiliza una sintaxis basada en HTML para describir la estructura del DOM y se pueden utilizar directivas, interpolaciones y expresiones para enlazar datos y manipular la interfaz de usuario de manera declarativa.</p>
            <pre>
              <code>
                &lt;template&gt;
                  &lt;div&gt;
                    &lt;h3&gt;&#123;&#123; titulo &#125;&#125;&lt;/h3&gt;
                    &lt;p&gt;&#123;&#123; mensaje &#125;&#125;&lt;/p&gt;
                  &lt;/div&gt;
                &lt;/template&gt;
              </code>
            </pre>
            <h2>Datos y estado</h2>
            <p>Los datos son propiedades que se definen en la instancia de Vue y que se utilizan para almacenar el estado del componente. Los datos pueden ser accedidos y modificados desde el template y se pueden enlazar de manera bidireccional, lo que significa que los cambios en los datos se reflejarán automáticamente en la interfaz de usuario y viceversa.</p>
            <pre>
              <code>
                data() {
                  return {
                    titulo: 'Mi Aplicación Vue',
                    mensaje: 'Hola Mundo!'
                  };
                }
              </code>
            </pre>
            <h2>Directivas</h2>
            <p>Las directivas son atributos especiales que se utilizan en los elementos del template para aplicar funcionalidad adicional al DOM. Las directivas más comunes en Vue.js incluyen v-model para enlazar datos a elementos de entrada, v-for para iterar sobre una lista de elementos y v-if para renderizar condicionalmente elementos en función de una expresión booleana.</p>
            <pre>
              <code>
                &lt;input v-model="titulo" /&gt;
                &lt;ul&gt;
                  &lt;li v-for="item in lista"&gt;&#123;&#123; item &#125;&#125;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;div v-if="mostrarMensaje"&gt;&#123;&#123; mensaje &#125;&#125;&lt;/div&gt;
              </code>
            </pre>
            <h2>Ciclo de vida del componente</h2>
            <p>Los componentes en Vue.js pasan por un ciclo de vida predefinido que consta de diferentes etapas, como la creación, montaje, actualización y destrucción del componente. Durante cada etapa del ciclo de vida, se ejecutan ganchos de ciclo de vida que permiten realizar acciones personalizadas, como inicializar datos, realizar llamadas a API externas o limpiar recursos.</p>
            <pre>
              <code>
                created() {
                  // Lógica personalizada al crear el componente
                },
                mounted() {
                  // Lógica personalizada al montar el componente en el DOM
                },
                updated() {
                  // Lógica personalizada al actualizar el componente
                },
                beforeDestroy() {
                  // Lógica personalizada antes de destruir el componente
                }
              </code>
            </pre>
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
  name: 'Fundamentos',
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
    async obtenerPreguntas() {
      this.preguntasGenerales = await QUESTIONS.getQuestions({"titulo":"fundamentos"})
      console.log(this.preguntasGenerales)
    },
    logout() {
      // Eliminar los datos del localStorage
      localStorage.clear();

      // Redirigir a la ruta "/logout"
      this.$router.push('/logout');
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

userPage {
  display: flex;
  flex-wrap: wrap; /* Agregamos flex-wrap: wrap para permitir el ajuste de elementos en varias líneas */
}

.menu {
  flex: 0 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  text-decoration: none;
}

.content {
  flex: 1;
  margin-left: 10rem;
  margin-bottom: 1rem; /* Agregamos margen inferior para separar el contenido del div questions */
}

.questions {
  margin-left: 10rem; /* Mantenemos el mismo margen izquierdo que el div content */
  margin-top: 1rem; /* Agregamos margen superior para separar el contenido del div content */
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

.question {
  margin-bottom: 20px;
}

.test-question {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

.code-completion-question,
.true-false-question {
  margin-bottom: 10px;
}
</style>
  