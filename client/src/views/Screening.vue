<template>
    {{preguntas}}
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
        const response = await SCREENING.getAllQuestions()
        this.preguntas = response;
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
  




  