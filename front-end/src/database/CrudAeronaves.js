const axios = require('axios').default;

import Aeronave from "../objects/aeronave.js";
import NaveNodriza from "../objects/naveNodriza.js";
import { getNaveNodrizaFromList } from "../utils.js";

export function obtenerAeronaves(listaNavesNodrizas,onSuccess, onError) {
  /* setTimeout(()=>{onSuccess([
        new Aeronave("idAeronave01","Nombreaeronave01",6,"id1","id3"),
        new Aeronave("idAeronave02","Nombreaeronave02",6,"id2","id2"),
        new Aeronave("idAeronave03","Nombreaeronave03",6,"id3","id1"),
      ],)},3000); */

  axios
    .get("http://localhost:3000/api/aeronave", {})
    .then(function(response) {
      console.log(response.data);
      
      var naves = [];
      response.data.forEach(element => {
        var naveOrigenName = getNaveNodrizaFromList(element.origen,listaNavesNodrizas).nombre;
        var naveDestinoName = getNaveNodrizaFromList(element.destino,listaNavesNodrizas).nombre;
          naves.push(new Aeronave(element._id,element.nombre,element.maxPasajeros,naveOrigenName,naveDestinoName,element.pasajeros))
      });
      console.log("naves");

      console.log(naves);

      onSuccess(naves);
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

export function crearAeronave(nombre,maxPasajeros,origen,destino,pasajeros, onSuccess, onError) {
  axios
    .post("http://localhost:3000/api/aeronave", {
      nombre: nombre,
      maxPasajeros: maxPasajeros,
      origen: origen,
      destino: destino,
      Pasajeros: pasajeros,
    })
    .then(function(response) {
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

export function borrarAeronave() {}

export function anadirPasajero(idAeronave, idPasajero, onSuccess, onError) {
  console.log("ids")

  console.log(idAeronave)
  console.log(idPasajero)

  axios
    .put(
      "http://localhost:3000/api/aeronave/" +
        idAeronave +
        "/pasajero/add/" +
        idPasajero,
      {}
    )
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

export function bajarPasajero(idAeronave, idPasajero, onSuccess, onError) {

  console.log("ids")

  console.log(idAeronave)
  console.log(idPasajero)

  axios
    .put(
      "http://localhost:3000/api/aeronave/" +
        idAeronave +
        "/pasajero/remove/" +
        idPasajero,
      {}
    )
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
