/*
 * Modelo
 */
var Modelo = function() {
  var datosEnLocalStorage = JSON.parse(localStorage.getItem('encuestas'));
  if (datosEnLocalStorage == null) {
    this.preguntas = [];
  } else {
    this.preguntas = datosEnLocalStorage;
  }
  
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);

  this.preguntaEliminada = new Evento(this); // evento agregado. Pampa.-

  this.preguntaEditada = new Evento(this); // evento agregado. Pampa.-

  this.todoBorrado = new Evento(this);  // evento agregado. Pampa.-

  this.votoGuardado = new Evento(this); // evento agregado. Pampa.-
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
    this.guardar();  
    this.preguntaEliminada.notificar();
  },


  // metodo agregado. Pampa.-
  editarPregunta: function(id,nuevaPregunta){
    var indiceElementoAEditar;
    this.preguntas.some(function(entry, i) {
      if (entry.id == id) {
        indiceElementoAEditar = i;
       }
    });
  
    this.preguntas[indiceElementoAEditar].textoPregunta = nuevaPregunta;
    this.guardar(); 
    this.preguntaEditada.notificar();
    },

  // metodo agregado. Pampa.-
  borrarTodasLasPreguntas: function() { 
    this.preguntas = [];
    this.guardar();  
    this.todoBorrado.notificar();
  },  

  agregarVoto: function(nombrePregunta,respuestaSeleccionada) { 
    var indicePregunta;
    this.preguntas.some(function(posicion, i) {
      if (posicion.textoPregunta === nombrePregunta) {
        indicePregunta = i;
       }
    });
    console.log("Pregunta: "+nombrePregunta);
    console.log("respuesta: "+respuestaSeleccionada);

    let posiblesRespuestas = this.preguntas[indicePregunta].cantidadPorRespuesta;
    console.log(posiblesRespuestas);

    var indiceRespuestaVotada = posiblesRespuestas.findIndex(respuestas => respuestas.textoRespuesta == respuestaSeleccionada)
    console.log("indice respuesta: "+indiceRespuestaVotada);
    let votos = this.preguntas[indicePregunta].cantidadPorRespuesta[indiceRespuestaVotada].cantidad;
    console.log("votosAntes: "+votos);

    votos++;
    this.preguntas[indicePregunta].cantidadPorRespuesta[indiceRespuestaVotada].cantidad=votos;

    this.guardar();  
    //this.votoGuardado.notificar();
  },  

  
  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('encuestas', JSON.stringify(this.preguntas));
  },


};

//         respuestas.push({'textoRespuesta': $(this).val(), 'cantidad': 0});  // listo. Pampa.-
//     var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};