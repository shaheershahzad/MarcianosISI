const axios = require('axios').default;


export function crearRevision(idAeronave,idRevisor,fechaRevision,onSuccess,onError){

    //setTimeout(()=>{onSuccess()},3000);

    axios
    .post("http://localhost:3000/api/revision", {
        idAeronave: idAeronave,
        idRevisor:idRevisor,
        fechaRevision:fechaRevision
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

export function obtenerRevisiones(onSuccess,onError){

      axios.get('http://localhost:3000/api/revision', { })
    .then(function (response) {
      onSuccess(response.data);
    })
    .catch(function (error) {
      onError(error);
    });

}


export function eliminarRevision(id,onSuccess,onError){


      axios.delete('http://localhost:3000/api/revision/'+id, { })
    .then(function (response) {
      onSuccess(response.data);
    })
    .catch(function (error) {
      onError(error);
    });

}
