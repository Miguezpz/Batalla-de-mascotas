//-------------------------------------------------------------------------------------

const express = require('express');
const cors = require('cors');

const app = express();

/* app.use(express.static('public')); */
app.use(express.json());
app.use(cors());

//-------------------------------------------------------------------------------------

const jugadores = [];
let ciclo = 1;

class Jugador {

    constructor(id) {
        this.id = id;
        this.x = 0;
        this.y = 0;
    };

    asignarMascota(mascota) {
        this.mascota = mascota;
    };

    obtenerMedidasCanvas(mapa_ancho, mapa_alto, img_size, hitbox_img) {
        this.mapa_ancho = mapa_ancho;
        this.mapa_alto = mapa_alto;
        this.img_size = img_size;
        this.hitbox_img = hitbox_img;
    };

    actualizarCoordenadas(x, y) {
        this.x = x;
        this.y = y;
    };

    guardarAtaques(ataques) {
        this.ataques = ataques;
    };

    coordenadasAleatorias() {
        this.x = numeroAleatorio(0, this.mapa_ancho - this.img_size);
        this.y = numeroAleatorio(0, this.mapa_alto - this.img_size);
        console.log('x',this.x, 'y',this.y);
    };
};

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function evitarColision(jugador_1, jugador_2) {

    const jugador_1_borde_izquierda = jugador_1.x - jugador_1.hitbox_img;
    const jugador_1_borde_derecha = jugador_1.x + jugador_1.img_size + jugador_1.hitbox_img;
    const jugador_1_borde_arriba = jugador_1.y - jugador_1.hitbox_img;
    const jugador_1_borde_abajo = jugador_1.y + jugador_1.img_size + jugador_1.hitbox_img;

    const jugador_2_borde_izquierda = jugador_2.x - jugador_2.hitbox_img;
    const jugador_2_borde_derecha = jugador_2.x + jugador_2.img_size + jugador_2.hitbox_img;
    const jugador_2_borde_arriba = jugador_2.y - jugador_2.hitbox_img;
    const jugador_2_borde_abajo = jugador_2.y + jugador_2.img_size + jugador_2.hitbox_img;

    if (
        jugador_1_borde_izquierda > jugador_2_borde_derecha ||
        jugador_1_borde_derecha < jugador_2_borde_izquierda ||
        jugador_1_borde_arriba > jugador_2_borde_abajo ||
        jugador_1_borde_abajo < jugador_2_borde_arriba
    ) {
        //No existe colisión
        console.log('NO EXISTE COLISION____________________');
        return;
    };

    //Si hubo colisión
    console.log('Colision____________________');

    recolocar_mascotas_online(jugador_1, jugador_2);
};

function recolocar_mascotas_online(jugador_1, jugador_2) { //Las coordenadas aleatorias deben aplicarse desde el servidor

    jugador_1.coordenadasAleatorias();
    jugador_2.coordenadasAleatorias();

    evitarColision(jugador_1, jugador_2);
};

//Si el usuario elige mascota primero, entonces esperará por el oponente, si el array o mascota del oponente es igual a 0, entonces el usuario toma la posicion 1,
//pero, si el usuario obtiene el array con 1 elemento entonces tomará la posicion 2 y viceversa. Esto se puede lograr con un if, if else.

//-------------------------------------------------------------------------------------

app.get('/Batalla-de-mascotas/multiplayer/obtenerId', (req, res) => {

    const jugadorId = `${Math.random()}`; //Se crea un ID
    const new_player = new Jugador(jugadorId); //Se crea una instancia con el ID del usuario
    jugadores.push(new_player); //se inyecta la instancia new_player al array jugadores

    res.setHeader('Access-Control-Allow-Origin', '*'); //Permite la conexión de cualquier origen
    res.send(jugadorId); //envia el id correspondiente al usuario que hace la solicitud get
});

app.post('/Batalla-de-mascotas/multiplayer/:jugadorId/enviar-mascota', (req, res) => {

    const jugadorId = req.params.jugadorId || ''; //Obtengo el id del usuario
    const mascota_seleccionada =  req.body.nombre || ''; //Obtengo el nombre de la mascota del usuario
    const mapa_ancho = req.body.mapa_ancho || '';
    const mapa_alto = req.body.mapa_alto || '';
    const img_size = req.body.img_size || '';
    const hitbox_img = req.body.hitbox_img || '';

    const jugadorIndex = jugadores.findIndex((jugador) => jugador.id === jugadorId); //Localizo el elemento que contiene el mismo ID que el usuario

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMascota(mascota_seleccionada); //Guardo la mascota seleccionada en el elemento correspondiente al usuario guardado en el array jugadores
        jugadores[jugadorIndex].obtenerMedidasCanvas(mapa_ancho, mapa_alto, img_size, hitbox_img);
    };

    console.log(jugadores[jugadorIndex]);
    res.end();
});

app.get('/Batalla-de-mascotas/multiplayer/:jugadorId/esperar_enemigo', (req, res) => {

    const jugadorId = req.params.jugadorId || '';
    const jugadorIndex =  jugadores.findIndex((jugador) => jugador.id === jugadorId && jugador.mascota); //Identifica el elemento del usuario por su ID
    const enemigoIndex = jugadores.findIndex((jugador) => jugador.id !== jugadorId && jugador.mascota); //Identifica el elemento del enemigo por su ID diferente

    const jugador = jugadores[jugadorIndex];
    const enemigo = jugadores[enemigoIndex];

    function recolocar_mascotas_online() { //Las coordenadas aleatorias deben aplicarse desde el servidor

        jugador.coordenadasAleatorias();
        enemigo.coordenadasAleatorias();

        console.log('se generaron coordenadas aleatorias =>', `${jugadorId}`);
        console.log('jugador: ', 'x',jugador.x, 'y',jugador.y, jugador.id);
        console.log('enemigo: ', 'x',enemigo.x, 'y',enemigo.y, enemigo.id);
        console.log('-------------------------------------------------');
        console.log('-------------------------------------------------');
    
        evitarColision(jugador, enemigo);
    };

    if (jugador && enemigo) {

        if (ciclo === 1) { //Se asegura que el primer usuario en hacer esta peticion sea el unico que pide generar mascotas

            ciclo++;
            recolocar_mascotas_online();
        };

        
        const coordenadas_jugador = {'x': jugador.x, 'y': jugador.y};
        res.send({coordenadas_jugador});
    };
});

//______________________________________________________________________________________________________

app.post('/Batalla-de-mascotas/multiplayer/:jugadorId/enviar-coordenadas', (req, res) => {

    const jugadorId = req.params.jugadorId || ''; //Obtengo el ID del usuario
    const x = req.body.x || ''; //Obtengo la coordenada de la mascota del usuario en x
    const y = req.body.y || ''; //Obtengo la coordenada de la mascota del usuario en y

    const jugadorIndex =  jugadores.findIndex((jugador) => jugador.id === jugadorId); //Identifica el elemento del usuario por su ID

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarCoordenadas(x, y); //Recuerda que enviaras las coordenadas iniciales a cada usuario, por lo que debes continuar enviado x y y aquí.
    };

    const enemigos_con_mascota = jugadores.filter((jugador) => 
    jugador.id !== jugadorId && jugador.mascota && jugador.x && jugador.y);

    res.send({enemigos_con_mascota});
});

app.post('/Batalla-de-mascotas/multiplayer/:jugadorId/enviar-ataques', (req, res) => {

    const jugadorId = req.params.jugadorId || '';
    const ataques_seleccionados = req.body.ataques || [];

    const jugadorIndex = jugadores.findIndex((jugador) => jugador.id === jugadorId);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].guardarAtaques(ataques_seleccionados);
    }

    res.end();
});

app.get('/Batalla-de-mascotas/multiplayer/:enemigoId/obtener-ataques-enemigo', (req, res) => {

    const enemigoId = req.params.enemigoId || '';
    const enemigoIndex = jugadores.findIndex((jugador) => jugador.id === enemigoId);

    if (enemigoIndex >= 0) {

        const ataques_server_enemigo = jugadores[enemigoIndex].ataques;
        res.send({ataques_server_enemigo});
    };
});

app.listen(8080, '0.0.0.0', () => {
    console.log('running server on port http://localhost:8080');
});


//Sobre la recolocacion aleatoria de las mascotas online: Reparar dimensiones del canvas reactivo, mandar las dimensiones e informacion necesaria para que desde aquí mismo
//en el código del servidor se generen las nuevas coordenadas aleatorias sin colision. 
//Hint, que las coordenadas aleatorias se generen a partir del usuario con la pantalla más chica. 