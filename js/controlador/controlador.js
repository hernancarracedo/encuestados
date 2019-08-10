
 /* Controlador */
 
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },

  //metodo agregado. Pampa.-
  borrarPregunta: function(id) {
    this.modelo.borrarPregunta(id);
  }, 

  //metodo agregado. Pampa.-
  editarPregunta: function(id,nuevaPregunta) {
    this.modelo.editarPregunta(id,nuevaPregunta);
  }, 

  //metodo agregado. Pampa.-
  borrarTodasLasPreguntas: function() {
    this.modelo.borrarTodasLasPreguntas();
  },  

  //metodo agregado. Pampa.-
  agregarVoto: function(nombrePregunta,respuestaSeleccionada) {
    this.modelo.agregarVoto(nombrePregunta,respuestaSeleccionada);
  },  
};
