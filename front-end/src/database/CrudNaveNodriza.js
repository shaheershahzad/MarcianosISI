const axios = require('axios').default;


export function crearNaveNodriza(nombre,onSuccess,onError){

    //setTimeout(()=>{onSuccess()},3000);

    axios
    .post("http://localhost:3000/api/nave", {
      nombre: nombre,
    })
    .then(function() {
      onSuccess();
    })
        .catch(function(error) {
      var errorCode = error.response.status;
      var errorText = error.response.data;
      if(errorCode == 404 || errorCode == 500){
        onError("Parametros no válidos");
      }else{
        onError(errorText);
      }
    
    });

}
import NaveNodriza from "../objects/naveNodriza.js";

export function obtenerNavesNodrizas(onSuccess,onError){

    /* setTimeout(()=>{onSuccess([
        new NaveNodriza("1", "Nave1"),
        new NaveNodriza("2", "Nave2"),
        new NaveNodriza("3", "Nave3"),
      ],)},3000); */

      axios.get('http://localhost:3000/api/nave', { })
    .then(function (response) {
        var naves = [];
        response.data.forEach(element => {
            naves.push(new NaveNodriza(element._id,element.nombre))
        });
  
        onSuccess(naves);
    })
    .catch(function (error) {
      var errorCode = error.response.status;
      var errorText = error.response.data;
      if(errorCode == 404 || errorCode == 500){
        onError("Parametros no válidos");
      }else{
        onError(errorText);
      }
    });

}


export function eliminarNaveNodriza(id,onSuccess,onError){

    /* setTimeout(()=>{onSuccess([
        new NaveNodriza("1", "Nave1"),
        new NaveNodriza("2", "Nave2"),
        new NaveNodriza("3", "Nave3"),
      ],)},3000); */

      axios.delete('http://localhost:3000/api/nave/'+id, { })
    .then(function (response) {
      onSuccess(response.data);
    })
    .catch(function (error) {
      var errorCode = error.response.status;
      var errorText = error.response.data;
      if(errorCode == 404 || errorCode == 500){
        onError("Parametros no válidos");
      }else{
        onError(errorText);
      }    });

}
