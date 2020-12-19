const axios = require('axios').default;


export function crearRevisor(nombre,onSuccess,onError){

    //setTimeout(()=>{onSuccess()},3000);

    axios
    .post("http://localhost:3000/api/revisor", {
      nombre: nombre,
    })
    .then(function() {
      onSuccess();
    })
        .catch(function(error) {
      console.log(error.response);
      var errorCode = error.response.status;
      var errorText = error.response.data;
      if(errorCode == 404){
        onError("Parametros no válidos");
      }else{
        onError(errorText);
      }
    
    });

}
import NaveNodriza from "../objects/naveNodriza.js";

export function obtenerRevisores(onSuccess,onError){

      axios.get('http://localhost:3000/api/revisor', { })
    .then(function (response) {
      console.log(response.data);
      onSuccess(response.data);
    })
    .catch(function (error) {
      console.log(error);
      onError(error);
    });

}


export function eliminarRevisor(id,onSuccess,onError){


      axios.delete('http://localhost:3000/api/revisor/'+id, { })
    .then(function (response) {
      console.log(response.data);
      onSuccess(response.data);
    })
    .catch(function (error) {
      console.log(error);
      onError(error);
    });

}
