<template>
    <div class="base-wireframe">
        <header>
            <h1 class="titulo"><router-link to="/userPage" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
            <nav>
                <ul>
                <li><router-link to="/chat">Chat</router-link></li>
                <li><router-link to="/logout" @click="logout">Logout</router-link></li>
                </ul>
            </nav>
        </header>
        <main>
            <div class="container">
                <select v-model="selectedOption">
                <option v-for="option in options" :key="option">{{ option }}</option>
                </select>
                <button @click="generateQuestion">Generar pregunta</button>
                <div><h3 v-if="espera">{{ mensajeEspera }}</h3></div>
                <div v-if="showQuestion">
                    <h3>{{ question }}</h3>
                    <div v-for="(option, index) in optionsAnswer" :key="index">
                        <input type="radio" :id="'option-' + index" :value="option" v-model="selectedOptionAnswer" @click="clearFeedback()" :disabled = "disabled === true">
                        <label :for="'option-' + index" @click="clearFeedback()" :disabled = "disabled === true">{{ option }}</label>
                    </div>
                    <button @click="submitAnswer" :disabled = "disabled === true">Enviar respuesta</button>
                    <div v-if="error" class="error">{{ error }}</div>
                    <div v-if="correct" class="correct">{{ correct }}</div>
                </div>
            </div>
        </main>
        <footer>
            <p>&copy; 2023 ChatGPT - Learning Vue</p>
        </footer>
    </div>
  </template>
  
  <script>
import CHAT from '../controllers/openAiChat'
export default {
  data() {
    return {
      options: [
        "Fundamentos",
        "Directivas",
        "Métodos",
        "Eventos",
        "Componentes",
        "Plantillas",
        "Routing",
        "Watchers",
        "Animation",
        "Build",
        "Deployment"
      ],
      error: "",
      espera: false,
      mensajeEspera: 'Generando pregunta...',
      selectedOption: "",
      showQuestion: false,
      question: '',
      optionsAnswer: [],
      selectedOptionAnswer: '',
      correctAnswer:'',
      correct: '',
      disabled: false
    };
  },
  methods: {
    async generateQuestion() {
        this.error = ''
        this.correct = ''
        this.showQuestion = false
        this.disabled = false
      if (this.selectedOption !== "") {
        let prompt = 'Generame una pregunta tipo test sobre '+ this.selectedOption +' de Vue y devuelveme un json:' +
            '{ "pregunta": "", "opciones": [], "respuesta_correcta": }' +
            'Y en el valor de respuesta correcta pon el índice del array donde se encuentra la respuesta correcta.' +
            'Devuelve solo el json, no escribas nada mas.'
        this.espera = true
        let jsonPregunta = JSON.parse(await CHAT.getQuestions({'pregunta':prompt}))
        this.espera = false
        this.question = jsonPregunta.pregunta
        this.optionsAnswer = jsonPregunta.opciones
        this.correctAnswer = jsonPregunta.respuesta_correcta
        this.showQuestion = true
      }
    },
    submitAnswer() {
      if (this.selectedOptionAnswer == '') {
        this.error = 'Selecciona una opción.'
      }else if (this.selectedOptionAnswer == this.optionsAnswer[this.correctAnswer]) {
        this.correct = '¡Respuesta correcta!'
      } else {
        this.error = 'Respuesta incorrecta'
        this.correct = 'La respuesta correcta es: ' + this.optionsAnswer[this.correctAnswer]
      }
      this.disabled = true
    },
    logout() {
      // Eliminar los datos del localStorage
      localStorage.clear();

      // Redirigir a la ruta "/logout"
      this.$router.push('/logout');
    },
    clearFeedback() {
        this.error = "";
        this.correct = "";
    }
  }
};
</script>
  
  <style scoped>
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

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin-bottom: 1rem;

}

.container {
  display:block;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  flex-grow: 1;
}

select {
  margin-right: 20px;
  flex-grow: 1;
  padding: 5px;
  border-radius: 5px;
  width: 350px;
}

button {
  margin-top: 10px;
  margin-right: 3px;
  padding: 0.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.error {
    color: red;
    margin-top: 5px;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.correct {
    margin-top: 5px;
}  
  </style>
  