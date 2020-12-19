const axios = require('axios').default;


export function crearPasajero(nombre,onSuccess,onError){

    //setTimeout(()=>{onSuccess()},3000);

    axios
    .post("http://localhost:3000/api/pasajero", {
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
import Pasajero from "../objects/pasajero.js";

export function obtenerPasajeros(onSuccess,onError){

      axios.get('http://localhost:3000/api/pasajero', { })
    .then(function (response) {
      console.log(response.data);
        var pasajeros = [];
        response.data.forEach(element => {
            pasajeros.push(new Pasajero(element._id,element.nombre))
        });
        console.log("pasajeros");
  
        console.log(pasajeros);
  
        onSuccess(pasajeros);
    })
    .catch(function (error) {
      console.log(error);
      onError(error);
    });

}


export function eliminarPasajero(id,onSuccess,onError){


      axios.delete('http://localhost:3000/api/pasajero/'+id, { })
    .then(function (response) {
      console.log(response.data);
      onSuccess(response.data);
    })
    .catch(function (error) {
      console.log(error);
      onError(error);
    });

}
