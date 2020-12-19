export function getNaveNodrizaFromList(idNave,lista){
    var aeronaveFinal;
    lista.forEach(aeronave => {
        if(aeronave.id==idNave){
            aeronaveFinal =  aeronave;
        }
    });
return aeronaveFinal;
}