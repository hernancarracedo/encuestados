/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  // suscripcion agregada. Pampa.-
  this.modelo.preguntaEliminada.suscribir(function() { 
    contexto.reconstruirLista(); 
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();  // listo. Pampa.-
    this.configuracionDeBotones(); // listo. Pampa.-
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem = $("<li class='list-group-item' id="+pregunta.id+">"+pregunta.textoPregunta+"</li>"); // listo. Pampa.-
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"

    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];
      var paso = 1;
      $('[name="option[]"]').each(function() {
        //completar
        console.log("paso "+paso);
        respuestas.push({'textoRespuesta': $(this).val(), 'cantidad': 0});  // listo. Pampa.-
        paso++;
      })
      respuestas.pop();  // !!!!!! siempre se va un campo oculto y vacio al final del array, aca lo quito.
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos

    e.botonBorrarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));
      console.log("la pregunta a borrar es: "+id);
      //contexto.limpiarFormulario();
      contexto.controlador.borrarPregunta(id);
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
