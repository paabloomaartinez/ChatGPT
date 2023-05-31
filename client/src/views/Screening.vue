<template>
  <div class="base-wireframe">
    <header>
        <h1 class="titulo"><router-link to="/" @click="logout" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
    </header>
    <main>
      <div class="screening-page">
        <div v-if="preguntas.length > 0">
          <h2>{{ preguntaActualData.pregunta }}</h2>
          <div>
            <div v-for="(opcion, index) in preguntaActualData.opciones" :key="index">
              <label>
                <input
                  type="radio"
                  :value="opcion"
                  v-model="preguntaActualData.respuesta"
                >
                {{ opcion }}
              </label>
            </div>
          </div>
          <br>
          <button @click="mostrarPreguntaAnterior" :disabled="preguntaActual === 0">Anterior</button>
          <button @click="mostrarSiguientePregunta" :disabled="preguntaActual === preguntas.length - 1">Siguiente</button>
          <div><button v-if="preguntaActual === preguntas.length - 1" @click="enviarRespuesta">Enviar</button></div>
          <br>
          <div v-if="error" class="error">{{ error }}</div>
        </div>
        <div v-else>
          <p>No se encontraron preguntas.</p>
        </div>
      </div>
    </main>
    <footer>
      <p>&copy; 2023 ChatGPT - Learning Vue</p>
    </footer>
  </div>
</template>

<script>
import SCREENING from '../controllers/screening';
import API from '../controllers/login'
export default {
  data() {
    return {
      preguntas: [],
      preguntaActual: 0,
      error: ""
    };
  },
  mounted() {
    this.obtenerPreguntas();

    window.addEventListener("beforeunload", this.limpiarLocalStorage);
  },
  beforeUnmount() {
  window.removeEventListener("beforeunload", this.limpiarLocalStorage);
  },
  methods: {
    async obtenerPreguntas() {
      try {
        const response = await SCREENING.getAllQuestions();
        this.preguntas = response;
        this.preguntas.forEach((pregunta) => {
          pregunta.respuesta = null;
        });
      } catch (error) {
        console.error(error);
      }
    },
    limpiarLocalStorage() {
    localStorage.removeItem('respuestas');
    },
    mostrarSiguientePregunta() {
      if (this.preguntaActual < this.preguntas.length - 1) {
        if(this.preguntaActualData.respuesta === null) {
          this.error = 'La respuesta a la pregunta es obligatoria.'
          return;
        }else {
          this.guardarRespuesta()
          this.preguntaActual++;
          this.error = ""
        }
      }
    },
    mostrarPreguntaAnterior() {
      if (this.preguntaActual > 0) {
        this.eliminarRespuesta()
        this.preguntaActual--;
      }
    },
    logout() {
      // Eliminar los datos del localStorage
      localStorage.clear();

      // Redirigir a la ruta "/logout"
      this.$router.push('/logout');
    },
    guardarRespuesta() {

      const respuestasGuardadas = JSON.parse(localStorage.getItem('respuestas')) || [];
      respuestasGuardadas.push(this.preguntaActualData.respuesta);
      localStorage.setItem('respuestas', JSON.stringify(respuestasGuardadas));
      
    },
    eliminarRespuesta() {
      const respuestasGuardadas = JSON.parse(localStorage.getItem('respuestas')) || [];
      respuestasGuardadas.pop();
      localStorage.setItem('respuestas', JSON.stringify(respuestasGuardadas));
    },
    async enviarRespuesta() {
      if(this.preguntaActualData.respuesta === null) {
          this.error = 'La respuesta a la pregunta es obligatoria.'
          return;
      }
      this.guardarRespuesta();
      await this.calculateLevel();
      this.$router.push('/login/ok');
    },
    async calculateLevel() {
      let userData = localStorage.getItem('user')
      let user = JSON.parse(userData)
      let respuestasData = localStorage.getItem('respuestas')
      let nivel = await SCREENING.calculateLevel({'respuestas':JSON.parse(respuestasData)})
      console.log(nivel.level)
      if (nivel.level == 'Principiante') {
        await API.setLevel(user[0].username, {'level':'Principiante', 'content':[
        { numero: 1, nombre: 'Fundamentos', enable: true},
        { numero: 2, nombre: 'Directivas', enable: false },
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
      } else {
        await API.setLevel(user[0].username, {'level': 'Intermedio', 'content':[
        { numero: 1, nombre: 'Fundamentos', enable: true},
        { numero: 2, nombre: 'Directivas', enable: true },
        { numero: 3, nombre: 'Metodos', enable: true },
        { numero: 4, nombre: 'Eventos', enable: false },
        { numero: 5, nombre: 'Componentes', enable: false },
        { numero: 6, nombre: 'Plantillas', enable: false },
        { numero: 7, nombre: 'Routing', enable: false },
        { numero: 8, nombre: 'Watchers', enable: false },
        { numero: 9, nombre: 'Animation', enable: false },
        { numero: 10, nombre: 'Build', enable: false },
        { numero: 11, nombre: 'Deployment', enable: false }
      ]})
      }
      
      let newUser = await API.getUserById(user[0].username)
      localStorage.setItem('user', JSON.stringify(newUser))
    }
  },
  computed: {
    preguntaActualData() {
      return this.preguntas[this.preguntaActual];
    }
  }
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

.screening-page {
  display:block;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
}

.opciones {
  display:block;
  flex-direction: column;
  margin-top: 2rem;
}

.opcion {
  margin-bottom: 1rem;
}

button {
  margin-top: 10px;
  margin-right: 10px;
  padding: 0.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
    color: red;
  }

</style>
