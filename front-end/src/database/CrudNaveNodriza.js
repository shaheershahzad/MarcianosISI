export function crearNaveNodriza(id,nombre,onSuccess,onError){

    setTimeout(()=>{onSuccess()},3000);

}
import NaveNodriza from "../objects/naveNodriza.js";

export function obtenerNavesNodrizas(onSuccess,onError){

    setTimeout(()=>{onSuccess([
        new NaveNodriza("1", "Nave1"),
        new NaveNodriza("2", "Nave2"),
        new NaveNodriza("3", "Nave3"),
      ],)},3000);

}
