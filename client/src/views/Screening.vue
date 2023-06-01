<template>
  <div class="base-wireframe">
    <header>
        <h1 class="titulo"><router-link to="/" @click="logout" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
    </header>
    <main>
      <div class="screening-page">
        <div v-if="preguntas.length > 0">
          <div class="pregunta-numero">{{ preguntaActual + 1 }}/{{ preguntas.length }}</div>
          <h2 class="pregunta">{{ preguntaActualData.pregunta }}</h2>
          <div class="opciones">
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
          <div class="sig-ant-buttons">
            <button @click="mostrarPreguntaAnterior" :disabled="preguntaActual === 0">Anterior</button>
            <button @click="mostrarSiguientePregunta" :disabled="preguntaActual === preguntas.length - 1">Siguiente</button>
          </div>
          <div>
            <button v-if="preguntaActual === preguntas.length - 1" @click="enviarRespuesta" class="enviar-button">Enviar</button>
          </div>
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
      localStorage.removeItem('respuestas')
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

main {
  flex: 1;
  padding: 1rem;
}

.screening-page {
  display:block;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #d7faee9a;
  border: 1px solid #ffffff;
  border-radius: 16px;
  box-shadow: 0 7px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  animation: dropdown 1s ease-out;
}

@keyframes dropdown {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.opciones {
  font-size: 1.2rem;
  display:block;
  flex-direction: column;
  margin-top: 2rem;
}

button {
  width: 300px;
  margin-top: 10px;
  margin-right: 10px;
  padding: 0.5rem;
  background-color: #2e373f;
  font-size: 1rem;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sig-ant-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

button:hover {
  background-color: #4e575f;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:active {
  background-color: #1d2124;
}

.pregunta-numero {
  text-align: right;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.pregunta {
  color: #2e373f;
  font-size: 2.5rem;
  text-align: center;
}

.error {
  color: red;
  animation: rumble 1s;
}

@keyframes rumble {
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }
  50% {
    opacity: 1;
    transform: translateX(0px);
  }
  60% {
    opacity: 1;
    transform: translateX(8px);
  }
  70% {
    opacity: 1;
    transform: translateX(-8px);
  }
  80% {
    opacity: 1;
    transform: translateX(4px);
  }
  90% {
    opacity: 1;
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0px);
  }
}

</style>
