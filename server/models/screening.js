const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  pregunta: {
    type: String,
    required: true
  },
  opciones: [String],
  respuestaCorrecta: {
    type: String,
    required: true
  },
  valoracion: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Pregunta', preguntaSchema);
