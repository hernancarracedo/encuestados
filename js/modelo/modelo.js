/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);

  // evento agregado. Pampa.-
  this.preguntaEliminada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var cantPreguntas = this.preguntas.length;
    var ultimoId;
    //console.log("pregunta en array: "+cantPreguntas);
    if (cantPreguntas == 0) {
      ultimoId = 0;
    } else {
      ultimoId = this.preguntas[cantPreguntas-1].id
    }
    return ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  // metodo agregado. Pampa.-
  borrarPregunta: function(id){
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id !== id);
    this.preguntaEliminada.notificar();
  },
  
  //se guardan las preguntas
  guardar: function(){
  },
};
