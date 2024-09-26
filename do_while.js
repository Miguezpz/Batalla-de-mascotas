let mapa_ancho = 250;
let mapa_alto = 250;
let existe_colision = true;
let colisiones = [];

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

class Mascotas {

    constructor() {
        this.x = numeroAleatorio(0, mapa_ancho);
        this.y = numeroAleatorio(0, mapa_alto);
        this.img_size = 30;
    };

    generarCoordenadasRandom() {
        this.x = numeroAleatorio(0, mapa_ancho);
        this.y = numeroAleatorio(0, mapa_alto);    
    };
};

let mascota_A = new Mascotas();
let mascota_B = new Mascotas();
let mascota_C = new Mascotas();
let mascota_D = new Mascotas();
let mascota_E = new Mascotas();
let mascota_F = new Mascotas();

let mascotas = [mascota_A, mascota_B, mascota_C, mascota_D, mascota_E, mascota_F];

console.log(mascotas);

//--------------------------------------------------------------------------------------------



function evitarColisionEntreMascotas_ciclo() {

    function detectarColision(mascota_1, mascota_2) {

        let izquierda_mascota_1 = mascota_1.x;
        let derecha_mascota_1 = mascota_1.x + mascota_1.img_size;
        let arriba_mascota_1 = mascota_1.y;
        let abajo_mascota_1 = mascota_1.y + mascota_1.img_size;
    
        let izquierda_mascota_2 = mascota_2.x;
        let derecha_mascota_2 = mascota_2.x + mascota_2.img_size;
        let arriba_mascota_2 = mascota_2.y;
        let abajo_mascota_2 = mascota_2.y + mascota_2.img_size;
    
    
        if (izquierda_mascota_1 > derecha_mascota_2 ||
            derecha_mascota_1 < izquierda_mascota_2 ||
            arriba_mascota_1 > abajo_mascota_2 ||
            abajo_mascota_1 < arriba_mascota_2) {
    
          return; 
        };
    
        console.log('Colision');
    
        colisiones.push('colision');
    };
    
    function revisarCoordenadas() {
    
        mascotas.forEach((mascota) => {mascota.generarCoordenadasRandom()});
        console.log('Se generaron nuevas coordenadas');
    
        for (let i = 0; i < mascotas.length; i++) {
    
            for (let n = i + 1; n < mascotas.length; n++) {
    
                console.log(`i = ${i}, n = ${n}`);
                detectarColision(mascotas[i], mascotas[n]);
    
            };
        };
    };

    //Aquí comienza el ciclo
    do {
        console.log('Se ha ejecutado el BUCLE________________________________');

        if (colisiones.length > 0) {

            
            colisiones.splice(0, colisiones.length);
            console.log('Se limpiaron los elementos del array colisiones, numero de colisiones = ', colisiones.length);
            
        };
        
        revisarCoordenadas();
        console.log('numero de colisiones = ', colisiones.length);

    } while (colisiones.length > 0);

    //No existen colisiones entre las mascotas
    console.log('Sin colision');
};

evitarColisionEntreMascotas_ciclo();



//Si detecta las colisiones, pero cuando detecta una colisión no reinicia las coordenadas ni reinicia el for anidado que compara todas las mascotas entre si.

