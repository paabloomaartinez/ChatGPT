<template>
  <div class="base-wireframe">
    <header>
        <h1 class="titulo"><router-link to="/" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
      <nav>
        <ul>
          <li><router-link to="/logout">Logout</router-link></li>
        </ul>
      </nav>
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

export default {
  data() {
    return {
      preguntas: [],
      preguntaActual: 0
    };
  },
  mounted() {
    this.obtenerPreguntas();
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
    mostrarSiguientePregunta() {
      if (this.preguntaActual < this.preguntas.length - 1) {
        this.preguntaActual++;
      }
    },
    mostrarPreguntaAnterior() {
      if (this.preguntaActual > 0) {
        this.preguntaActual--;
      }
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

.screening-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
}

.opciones {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.opcion {
  margin-bottom: 1rem;
}

button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

</style>
