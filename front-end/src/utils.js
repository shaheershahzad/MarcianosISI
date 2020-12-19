export function getNaveNodrizaFromList(idNave,lista){
    var aeronaveFinal;
    lista.forEach(aeronave => {
        if(aeronave.id==idNave){
            aeronaveFinal =  aeronave;
        }
    });
return aeronaveFinal;
}

export function getListaPasajerosDeNave(idNave,listaNaves,listaTodosPasajeros){
    var listaFinal = [];
    var naveFinal;
    listaNaves.forEach(aeronave => {
        if(aeronave.id==idNave){
            naveFinal =  aeronave;
        }
    });
    naveFinal.pasajeros.forEach(idPasajero=>{
        listaTodosPasajeros.forEach(pasajero=>{
            if(idPasajero==pasajero.id){
                listaFinal.push(pasajero);
            }
        })

    })

return listaFinal;
}