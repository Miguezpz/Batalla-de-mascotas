const section_gamemode = document.getElementById('modo_juego');
const section_1 = document.getElementById("section_1");
const section_looking_for_opponent = document.getElementById('esperar-enemigo-multijugador');
const section_mapa = document.getElementById("ver-mapa");
const section_2 = document.getElementById("section_2");
const section_3 = document.getElementById("section_3");
const section_4 = document.getElementById("section_4");
const div_caja_mascotas = document.getElementById("caja-mascotas");
const boton_campaign_mode = document.getElementById('button-campaign-mode');
const boton_random_mode = document.getElementById('button-random-mode');
const boton_multiplayer_mode = document.getElementById('button-multiplayer-mode');
const boton_seleccionar = document.getElementById("boton-seleccionar");
const caja_botones_ataque = document.getElementById("caja-botones-ataque");
const registro_ataques_J1 = document.getElementById("ataques-J1");
const registro_ataques_J2_CPU = document.getElementById("ataques-J2/CPU");
const boton_de_reiniciar = document.getElementById("boton-de-reiniciar");
const boton_continuar_multijugador = document.getElementById('boton-continuar-multijugador');
const span_esperando_enemigo_online = document.getElementById('mensaje-enemigo-multijugador');
const div_resultado_del_combate = document.getElementById("resultado-del-combate")
const div_nombre_mascota_J1 = document.getElementById("nombre-mascota-J1");
const div_nombre_mascota_J2_CPU = document.getElementById("nombre-mascota-J2/CPU");
const div_img_mascota_J1 = document.getElementById("img-J1");
const div_img_mascota_J2_CPU = document.getElementById("img-J2/CPU");
const div_victorias_J1 = document.getElementById("victorias-J1");
const div_victorias_J2_CPU = document.getElementById("victorias-J2/CPU");
const mapa = document.getElementById("mapa");
const lienzo = mapa.getContext("2d");
const mapa_background = new Image();
mapa_background.src = "./resources/assets/mokemap.png";
let input_radio_peluchin;
let input_radio_sazu;
let input_radio_aren;
let input_radio_oreo;
let input_radio_loro;
let input_radio_guero;
let mascota_P1;
let mascota_enemiga;
let botones_ataques_P1;
let botones_por_su_class;

const ataques_P1 = [];
const ataques_enemigo = [];
const ataques_seleccionados_P1 = [];
const ataques_seleccionados_enemigo = [];

let victorias_P1 = 0;
let victorias_enemigo = 0;
let boton_presionado;
let intervalo;
const mascotas = [];
let mascotas_enemigas = []; //Se mantiene con let ya que se modifica en la funcion server_enviar_coordenadas con el método .map();
const mascotas_canvas = [];
let modo_de_juego;
let campaign_mode = 'modo_campaña';
let random_mode = 'modo_aleatorio';
let multiplayer_mode = 'modo_multijugador';
let jugadorId = null;
let enemigoId = null;

let ciclo = 1;

//______________Dimensiones del Canvas_________________________________________

const devicePixelRatio = window.devicePixelRatio || 1;
let anchoMapa = window.innerWidth - 20;
const anchoMaximoMapa = 480;

if (anchoMapa > anchoMaximoMapa) {
    anchoMapa = anchoMaximoMapa - 20;
};

let altoMapa = anchoMapa * 440 / anchoMaximoMapa;

mapa.width = anchoMapa;
mapa.height = altoMapa;

let size_img_mascota = anchoMapa * 50 / anchoMaximoMapa;
let hitbox_img = size_img_mascota * 20 / 100; //20 equivale al % que se le resta al area del hitbox de la imagen de la mascota
let velocidad_de_desplazamiento = mapa.width * 3 / anchoMaximoMapa;

// Clase--------------------------------------------------------------
class Batalla_de_mascotas {

    constructor(nombre, img, id, img_head) {

        this.nombre = nombre;
        this.img = img;
        this.id = id;
        this.ataques = [];

        this.ancho = size_img_mascota;
        this.alto = size_img_mascota;
        this.x = numeroAleatorio(0, mapa.width - this.ancho);
        this.y = numeroAleatorio(0, mapa.height - this.alto);
        
        this.mapaFoto = new Image(); //Imagenes Originales de las mascotas
        this.mapaFoto.src = img; //Imagenes Originales de las mascotas
        this.velocidad_X = 0;
        this.velocidad_Y = 0;
        this.cabezaFoto = new Image(); //Imagenes Platzi
        this.cabezaFoto.src = img_head; //Imagenes Platzi
    }

    pintarMascota() {

        lienzo.drawImage(
            this.mapaFoto, 
            this.x, 
            this.y, 
            this.ancho, 
            this.alto
        );
    };

    coordenadasAleatorias() {

        this.x = numeroAleatorio(0, mapa.width - this.ancho);
        this.y = numeroAleatorio(0, mapa.height - this.alto);
    };
};

const piedra = {tipo:"piedra", img:"./resources/ataques/piedra.png"};
const papel = {tipo:"papel", img:"./resources/ataques/papel.png"};
const tijera = {tipo:"tijera", img:"./resources/ataques/tijeras.png"};

const set_ataques_1 = [piedra, piedra, piedra, papel, tijera];
const set_ataques_2 = [papel, papel, papel, tijera, piedra];
const set_ataques_3 = [tijera, tijera, tijera, piedra, papel];

//Mascotas
let peluchin = new Batalla_de_mascotas(
    "Peluchin", "./resources/mascotas/peluchin.jpg", "peluchin_id", "./resources/mascotas_canvas/peluchin_sf.jpeg");
let sazu = new Batalla_de_mascotas(
    "Sazu", "./resources/mascotas/sazu.jpg", "sazu_id", "./resources/mascotas_canvas/sazu_sf.jpeg");
let aren = new Batalla_de_mascotas(
    "Aren", "./resources/mascotas/aren.png", "aren_id", "./resources/mascotas_canvas/aren_sf.jpeg");
let oreo = new Batalla_de_mascotas(
    "Oreo", "./resources/mascotas/oreo.jpg", "oreo_id", "./resources/mascotas_canvas/oreo_sf.jpeg");
let loro = new Batalla_de_mascotas(
    "Loro", "./resources/mascotas/loro.jpg", "loro_id", "./resources/mascotas_canvas/loro_sf.jpeg");
let guero = new Batalla_de_mascotas(
    "Güero", "./resources/mascotas/güero.jpg", "guero_id", "./resources/mascotas_canvas/guero_sf.jpeg");
    
mascotas.push(peluchin,sazu,aren,oreo,loro,guero);

//Ataques
peluchin.ataques.push(...set_ataques_1);
sazu.ataques.push(...set_ataques_1);
aren.ataques.push(...set_ataques_2);
oreo.ataques.push(...set_ataques_2);
loro.ataques.push(...set_ataques_3);
guero.ataques.push(...set_ataques_3);

// Opciones: Gato Huaniqueo, (guero, mona), kong, regalito, la negra, (bobby, dinky, wanda), hueso, kaiser,
//claudia gato; pug de arturin;


//-----------------------------------------------------------------------------------------------------------------
function iniciarJuego() {

    function modoDeJuego(modo) {

        modo_de_juego = modo;

        if (modo_de_juego == campaign_mode || modo_de_juego == random_mode) {

            cargarMascotasEnemigas();
            secciones("none", "flex", "none", "none", "none", "none", "none");

        } else if (modo_de_juego == multiplayer_mode) {

            server_obtener_jugadorId();
            secciones("none", "flex", "none", "none", "none", "none", "none");
        };
    };

    boton_campaign_mode.addEventListener('click', modoDeJuego.bind(null, campaign_mode));
    boton_random_mode.addEventListener('click', modoDeJuego.bind(null, random_mode));
    boton_multiplayer_mode.addEventListener('click', modoDeJuego.bind(null, multiplayer_mode));

    mascotas.forEach(x => {
        let estructura = `
            <input type="radio" id="${x.id}" name="enlace" class="input-radio-mascotas">
            <label for="${x.id}" class="label-mascota"><img src="${x.img}" alt="${x.nombre}">${x.nombre}</label> 
        `
        div_caja_mascotas.innerHTML += estructura;
    });
    
    input_radio_peluchin = document.getElementById("peluchin_id");
    input_radio_sazu = document.getElementById("sazu_id");
    input_radio_aren = document.getElementById("aren_id");
    input_radio_oreo = document.getElementById("oreo_id");
    input_radio_loro = document.getElementById("loro_id");
    input_radio_guero = document.getElementById("guero_id");

    boton_seleccionar.addEventListener("click", seleccionarMascota_P1);
    boton_de_reiniciar.addEventListener("click", _ => location.reload());

    boton_continuar_multijugador.addEventListener('click', () => {

        secciones("none", "none", "none", "flex", "node", "none", "none");
        iniciarMapa(pintarCanvas_multijugador, 50);
    });

    secciones("flex", "none", "none", "none", "none", "none", "none");
};

function cargarMascotasEnemigas() { //Mascotas Enemigas
    
    let enemigo_peluchin = new Batalla_de_mascotas(
        "Peluchin", "./resources/mascotas/peluchin.jpg", "peluchin_id", "./resources/mascotas_canvas/peluchin_sf.jpeg");
    let enemigo_sazu = new Batalla_de_mascotas(
        "Sazu", "./resources/mascotas/sazu.jpg", "sazu_id", "./resources/mascotas_canvas/sazu_sf.jpeg");
    let enemigo_aren = new Batalla_de_mascotas(
        "Aren", "./resources/mascotas/aren.png", "aren_id", "./resources/mascotas_canvas/aren_sf.jpeg");
    let enemigo_oreo = new Batalla_de_mascotas(
        "Oreo", "./resources/mascotas/oreo.jpg", "oreo_id", "./resources/mascotas_canvas/oreo_sf.jpeg");
    let enemigo_loro = new Batalla_de_mascotas(
        "Loro", "./resources/mascotas/loro.jpg", "loro_id", "./resources/mascotas_canvas/loro_sf.jpeg");
    let enemigo_guero = new Batalla_de_mascotas(
        "Güero", "./resources/mascotas/güero.jpg", "guero_id", "./resources/mascotas_canvas/guero_sf.jpeg");

    mascotas_enemigas.push(enemigo_peluchin, enemigo_sazu, enemigo_aren, enemigo_oreo, enemigo_loro, enemigo_guero);
};

function server_obtener_jugadorId() {

    fetch('http://localhost:8080/Batalla-de-mascotas/multiplayer/obtenerId')
        .then((res) => {

            if (res.ok) {

                res.text()
                    .then((respuesta) => {
                        jugadorId = respuesta;
                        console.log(`Your ID: ${jugadorId}`);
                    });
            };
        });
};

function server_enviar_mascota(nombre, mapa_ancho, mapa_alto, img_size, hitbox_img) {

    console.log(mascota_P1.nombre);

    fetch(`http://localhost:8080/Batalla-de-mascotas/multiplayer/${jugadorId}/enviar-mascota`, {
        
        method: 'post',

        headers: {'Content-Type': 'application/json'},

        body: JSON.stringify({
            /* mascota: mascota_P1.nombre */
            /* mapa.width, mapa.height, mascota_P1.ancho, mascota_P1.alto); */
            nombre, 
            mapa_ancho, 
            mapa_alto, 
            img_size,
            hitbox_img
        })
    });
};

function server_esperar_enemigo_online() { //Detectar 2do player y obtener las nuevas coordenadas del usuario

    console.log('Esperando enemigo...');

    fetch(`http://localhost:8080/Batalla-de-mascotas/multiplayer/${jugadorId}/esperar_enemigo`)
        .then((res) => {

            if (res.ok) { //Si esto se ejecuta es porque el server detecto al enemigo y nos envio la información del enemigo

                res.json()
                    .then(({coordenadas_jugador}) => {
                        console.log(coordenadas_jugador);

                        if (ciclo === 1 && coordenadas_jugador) {

                            ciclo++;

                            clearInterval(intervalo);
                            console.log(coordenadas_jugador);

                            mascota_P1.x = coordenadas_jugador.x;
                            mascota_P1.y = coordenadas_jugador.y;

                            
                            console.log('jugador', coordenadas_jugador.x, coordenadas_jugador.y);
                            
                            
                            span_esperando_enemigo_online.innerHTML = 'Adversario localizado';
                            boton_continuar_multijugador.style.display = 'flex';

                            
                            //Continuar con la logica del la confirmacion, leerla y ajustarla si es necesario, dudo si se puedan hacer 2 peticiones diferentes
                            //al mismo URL

                            //Completamente innecesario, un usuario abre canvas primero siempre, asi que la confirmacion no se necesita

                            //Reflexionar las coordenadas dinamicas con regla de 3 para dimensiones de canvas diferentes
                            //Idea sobre coordenadas: tener dimensiones del canva como default, me refiero al mapa_ancho, mapa_alto, usar las mismas dimensiones, sobre todo
                            // en evitar colision en el servidor para que no se use el this.hitbox_img, y mas bien usar hitbox_img, ya que si los dispositivos de ambos usuarios
                            //son de tamaños diferentes entonces el hitbox_img serán diferentes para cada nueva posicion de mascota generada
                        };                     
                    });
            };
        });
};

function server_enviar_coordenadas(x, y) { /* server_enviar_coordenadas(mascota_P1.x, mascota_P1.y, mapa.width, mapa.height, mascota_P1.ancho, mascota_P1.alto); */

    fetch(`http://localhost:8080/Batalla-de-mascotas/multiplayer/${jugadorId}/enviar-coordenadas`, {
        
        method: 'post',

        headers: {'Content-Type': 'application/json'},

        body: JSON.stringify({x, y})
    })
        .then((res) => {

            if (res.ok) {

                res.json()
                    .then(({ enemigos_con_mascota }) => {

                        if (enemigos_con_mascota.length > 0) {

                            mascotas_enemigas = enemigos_con_mascota.map((enemigo) => {

                                let nombre_mascota_enemigo_online = enemigo.mascota;
                                let mascota_enemigo = null;

                                /* if (nombre_mascota_enemigo_online == 'Peluchin') {
                                    mascota_enemigo = new Batalla_de_mascotas(
                                        "Peluchin", "./resources/mascotas/peluchin.jpg", enemigo.id, "./resources/mascotas_canvas/peluchin_sf.jpeg");

                                } else if (nombre_mascota_enemigo_online == 'Sazu') {
                                    mascota_enemigo = new Batalla_de_mascotas(
                                        "Sazu", "./resources/mascotas/sazu.jpg", enemigo.id, "./resources/mascotas_canvas/sazu_sf.jpeg");
                                        
                                } else if (nombre_mascota_enemigo_online == 'Aren') {
                                    mascota_enemigo = new Batalla_de_mascotas(
                                        "Aren", "./resources/mascotas/aren.png", enemigo.id, "./resources/mascotas_canvas/aren_sf.jpeg");
                                        
                                } else if (nombre_mascota_enemigo_online == 'Oreo') {
                                    mascota_enemigo = new Batalla_de_mascotas(
                                        "Oreo", "./resources/mascotas/oreo.jpg", enemigo.id, "./resources/mascotas_canvas/oreo_sf.jpeg");
                                        
                                } else if (nombre_mascota_enemigo_online == 'Loro') {
                                    mascota_enemigo = new Batalla_de_mascotas(
                                        "Loro", "./resources/mascotas/loro.jpg", enemigo.id, "./resources/mascotas_canvas/loro_sf.jpeg");
                                        
                                } else if (nombre_mascota_enemigo_online == 'Güero') {
                                    mascota_enemigo = new Batalla_de_mascotas(
                                        "Güero", "./resources/mascotas/güero.jpg", enemigo.id, "./resources/mascotas_canvas/guero_sf.jpeg");    
                                }; */
                                //honestamente creo que puedo optimizar esta parte, no es necesario tener las mascotas enemigas.
                                //creo que seria algo como esto...
                                
                                //OPTIMIZADO optimizado
                                let mascota_index_123 = mascotas.findIndex((mascota) => mascota.nombre === nombre_mascota_enemigo_online);
                                mascota_enemigo = mascotas[mascota_index_123];
                                mascota_enemigo.id = enemigo.id;
                               

                                let x_dinamico = enemigo.x * mapa.width / enemigo.mapa_ancho; //No funciona Verificar que enemigo.mapa_ancho y alto vienen en el json
                                let y_dinamico = enemigo.y * mapa.height / enemigo.mapa_alto; //No funciona

                                mascota_enemigo.x = x_dinamico;
                                mascota_enemigo.y = y_dinamico;

                                return mascota_enemigo;
                            });      
                        };
                    });
            };
        });
};

function server_enviar_ataques(ataques) {

    fetch(`http://localhost:8080/Batalla-de-mascotas/multiplayer/${jugadorId}/enviar-ataques`, {

        method: 'post',

        headers: {'Content-Type': 'application/json'},

        body: JSON.stringify({ataques})
    });

    intervalo = setInterval(server_esperar_ataques_enemigo, 500);
};

function server_esperar_ataques_enemigo() {

    fetch(`http://localhost:8080/Batalla-de-mascotas/multiplayer/${enemigoId}/obtener-ataques-enemigo`) //enemigo ID, no lo olvides
        .then((res) => {

            if (res.ok) {

                res.json()
                    .then(({ataques_server_enemigo}) => {

                        if (ataques_server_enemigo != undefined && ataques_server_enemigo.length == 5) {

                            clearInterval(intervalo);
                            ataques_seleccionados_enemigo.push(...ataques_server_enemigo);
                            combate(ataques_seleccionados_enemigo);
                        };
                    });
            };
        });
};

function seleccionarMascota_P1() {

    if (input_radio_peluchin.checked) {
        mascota_P1 = peluchin;
        
    } else if (input_radio_sazu.checked) {
        mascota_P1 = sazu;
        
    } else if (input_radio_aren.checked) {
        mascota_P1 = aren;
        
    } else if (input_radio_oreo.checked) {
        mascota_P1 = oreo;
        
    } else if (input_radio_loro.checked) {
        mascota_P1 = loro;
        
    } else if (input_radio_guero.checked) {
        mascota_P1 = guero;
        
    } else {
        return;
    };

    div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
    accionesPrevias(mascota_P1);
};

function numeroAleatorio(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
};

function secciones(gamemode, seleccionar_mascota, buscando_oponente, canvas, ataques, resultado, panel_combate) {

    section_gamemode.style.display = gamemode;
    section_1.style.display = seleccionar_mascota;
    section_looking_for_opponent.style.display = buscando_oponente;
    section_mapa.style.display = canvas;
    section_2.style.display = ataques;
    section_3.style.display = resultado;
    section_4.style.display = panel_combate;
};

function mostrarVictorias(text1, text2) {
    div_victorias_J1.innerHTML = text1;
    div_victorias_J2_CPU.innerHTML = text2;
};

function accionesPrevias(mascota_P1) { 

    if (modo_de_juego == campaign_mode) {

        removerObjetoDeArray_mascotas_enemigas(mascota_P1);
        mascotas_canvas.push(mascota_P1, ...mascotas_enemigas); // Inyecto el jugador y los enemigos
        proceso(); // Si hay colisión recoloca mascotas en el canvas
        secciones("none", "none", "none", "flex", "node", "none", "none");
        iniciarMapa(pintarCanvas, 10);

    } else if (modo_de_juego == random_mode) {

        seleccionarEnemigo();

    } else if (modo_de_juego == multiplayer_mode) {

        console.log('Usuario: ', 'x', mascota_P1.x, 'y', mascota_P1.y);
        server_enviar_mascota(mascota_P1.nombre, mapa.width, mapa.height, size_img_mascota, hitbox_img);
        secciones("none", "none", "flex", "none", "none", "none", "none");
        intervalo = setInterval(server_esperar_enemigo_online, 8000);
    };
};

function seleccionarEnemigo(enemigo) {

    if (modo_de_juego == campaign_mode) {

        mascota_enemiga = mascotas[mascotas.findIndex(mascota => mascota.nombre === enemigo.nombre)]; //Optimizado
        div_nombre_mascota_J2_CPU.innerHTML = mascota_enemiga.nombre;
        ataques_enemigo.push(...mascota_enemiga.ataques); //Spread operator (...)

        mostrarVictorias("🏆" + victorias_P1, "💀" + victorias_enemigo);
        generarImagenesDeMascotas();
        generarBotonesDeAtaque();
        
    } else if (modo_de_juego == random_mode) {

        mascota_enemiga = mascotas[numeroAleatorio(0, mascotas.length - 1)];
        div_nombre_mascota_J2_CPU.innerHTML = mascota_enemiga.nombre;
        ataques_enemigo.push(...mascota_enemiga.ataques); //Spread operator (...)

        mostrarVictorias("🏆" + victorias_P1, "💀" + victorias_enemigo);
        generarImagenesDeMascotas();
        generarBotonesDeAtaque();
        secciones("none", "none", "none", "none", "flex", "none", "flex");

    } else if (modo_de_juego == multiplayer_mode) {
        
        mascota_enemiga = enemigo;
        div_nombre_mascota_J2_CPU.innerHTML = mascota_enemiga.nombre;
        mostrarVictorias("🏆" + victorias_P1, "💀" + victorias_enemigo);
        generarImagenesDeMascotas();
        generarBotonesDeAtaque();
    };
};

function generarImagenesDeMascotas() {

    let imagen_mascota_J1 = `
        <img src="${mascota_P1.img}" alt="${mascota_P1.nombre}" class="mascota-seleccionada">
    `;

    let imagen_mascota_J2_CPU = `
        <img src="${mascota_enemiga.img}" alt="${mascota_enemiga.nombre}" class="mascota-seleccionada">
    `;

    div_img_mascota_J1.innerHTML = imagen_mascota_J1;
    div_img_mascota_J2_CPU.innerHTML = imagen_mascota_J2_CPU;
};

function generarBotonesDeAtaque() {
    
    ataques_P1.push(...mascota_P1.ataques); //Optimizado

    ataques_P1.forEach(x => {
        botones_ataques_P1 = `
            <button class="botones-generados">
                <img src="${x.img}" alt="${x.tipo}">   
            </button>
        `;

        caja_botones_ataque.innerHTML += botones_ataques_P1;
        botones_por_su_class = document.querySelectorAll(".botones-generados img");

        botones_por_su_class.forEach(x => {

            x.parentNode.addEventListener("click", (e) => {

                boton_presionado = e.target.parentNode;
                
                if (e.target.alt === piedra.tipo) {

                    boton_presionado.style.background = "rgba(0, 0, 0, 0.4)";
                    boton_presionado.disabled = true;
                    ataqueSeleccionado_P1(piedra.img);

                } else if (e.target.alt === papel.tipo) {

                    boton_presionado.style.background = "rgba(0, 0, 0, 0.4)";
                    boton_presionado.disabled = true;
                    ataqueSeleccionado_P1(papel.img);

                } else if (e.target.alt === tijera.tipo) {
                    
                    boton_presionado.style.background = "rgba(0, 0, 0, 0.4)";
                    boton_presionado.disabled = true;
                    ataqueSeleccionado_P1(tijera.img);
                };
            });
        });
    });

    //En este ejemplo, las imágenes se seleccionan usando document.querySelectorAll('.botones-generados img'), 
    //lo que devuelve una lista de todas las imágenes dentro de los botones generados. Luego, se itera sobre esta 
    //lista y se añade el EventListener correspondiente a cada imagen. Al hacer clic en la imagen, se comprueba su 
    //atributo alt en lugar de textContent, ya que el contenido del botón ahora incluye tanto la imagen como el emoji.

    //Quiero mencionar que el error que me daba antes se ha solucionado debido a que detecto el boton clickeado por su alt y no otro parametro
};

function ataqueSeleccionado_P1(x) {

    ataques_seleccionados_P1.push(x);

    if (modo_de_juego == campaign_mode || modo_de_juego == random_mode) {

        let numero_random = numeroAleatorio(0, ataques_enemigo.length - 1);
        ataques_seleccionados_enemigo.push(ataques_enemigo[numero_random].img);
        ataques_enemigo.splice(numero_random, 1);

        if (ataques_seleccionados_P1.length == 5) { 
            combate(ataques_seleccionados_enemigo);
        };
           
    } else if (modo_de_juego == multiplayer_mode) {

        if (ataques_seleccionados_P1.length == 5) {

            boton_de_reiniciar.style.display = 'none';
            secciones('none', 'none', "none", 'none', 'flex', 'flex', 'flex');
            resultadoCombate('Esperando ataques del oponente...');
            server_enviar_ataques(ataques_seleccionados_P1);
        };
    };
};

function combate(ataques_seleccionados_enemigo) {

    for (let i = 0; i < 5; i ++) {

        if (ataques_seleccionados_P1[i] === piedra.img && ataques_seleccionados_enemigo[i] === tijera.img) {

            victorias_P1 ++;

        } else if (ataques_seleccionados_P1[i] === tijera.img && ataques_seleccionados_enemigo[i] === papel.img) {

            victorias_P1 ++;

        } else if (ataques_seleccionados_P1[i] === papel.img && ataques_seleccionados_enemigo[i] === piedra.img) {

            victorias_P1 ++;

        } else if (ataques_seleccionados_P1[i] === ataques_seleccionados_enemigo[i]){

            //Empate- No hay acción;

        } else {
            victorias_enemigo ++;
        };
    };

    if (victorias_P1 > victorias_enemigo) {
        resultadoCombate("🍕¡Ganaste!🍕");
    } else if (victorias_P1 < victorias_enemigo) {
        resultadoCombate("Perdiste😪");
    } else if (victorias_P1 === victorias_enemigo) {
        resultadoCombate("Empate🦧");
    }

    mostrarVictorias("🏆" + victorias_P1, "💀" + victorias_enemigo);
    imprimirAtaques();
    boton_de_reiniciar.style.display = 'flex';
    secciones("none", "none", "none", "none", "flex", "flex", "flex");
};

function resultadoCombate(text) {

    div_resultado_del_combate.innerHTML = text;
};

function imprimirAtaques() {

    for (let i = 0; i < ataques_P1.length; i++) {

        let parrafo1 = document.createElement("p");
        let parrafo2 = document.createElement("p");

        parrafo1.innerHTML = `<img src="${ataques_seleccionados_P1[i]}" class="imagen-ataque-seleccionado">`;
        parrafo2.innerHTML = `<img src="${ataques_seleccionados_enemigo[i]}" class="imagen-ataque-seleccionado">`; //-- Ajustado a CPU y no a J2.

        parrafo1.classList.add("cuadro-ataque-seleccionado");
        parrafo2.classList.add("cuadro-ataque-seleccionado");

        registro_ataques_J1.appendChild(parrafo1);
        registro_ataques_J2_CPU.appendChild(parrafo2);
    };
};

//Canvas; Es el mapa en el que se desplaza la mascota seleccionada
function iniciarMapa(fn, second) {
    intervalo = setInterval(fn, second); //10 default
    window.addEventListener("keydown", moverConTeclas);
    window.addEventListener("keyup", detenerMovimientoTeclas);
}

//Aquí dibujo las mascotas y el fondo sobre el lienzo Canvas, muevo los objetos y detecto colisiones.
function pintarCanvas() {
    
    mascota_P1.x = mascota_P1.x + mascota_P1.velocidad_X;
    mascota_P1.y = mascota_P1.y + mascota_P1.velocidad_Y;

    lienzo.clearRect(0, 0, mapa.width, mapa.height);

    lienzo.drawImage(
        mapa_background,
        0,
        0,
        mapa.width,
        mapa.height
    );

    mascota_P1.pintarMascota(); //Nuevo

    mascotas_enemigas.forEach(enemigo => {
        enemigo.pintarMascota();
    });

    if(mascota_P1.velocidad_X !== 0 || mascota_P1.velocidad_Y !== 0) {

        detenerEnBordesDelMapa(mascota_P1);
        mascotas_enemigas.forEach(enemigo => {
            detectarColision(enemigo, mascota_P1);
        });
    };
};

function pintarCanvas_multijugador() {

    mascota_P1.x = mascota_P1.x + mascota_P1.velocidad_X;
    mascota_P1.y = mascota_P1.y + mascota_P1.velocidad_Y;

    lienzo.clearRect(0, 0, mapa.width, mapa.height);

    lienzo.drawImage(
        mapa_background,
        0,
        0,
        mapa.width,
        mapa.height
    );

    server_enviar_coordenadas(mascota_P1.x, mascota_P1.y);

    

    mascotas_enemigas.forEach((enemigo) => {

        enemigo.pintarMascota()
    });

    mascota_P1.pintarMascota();

    mascotas_enemigas.forEach((enemigo) => {

        detectarColision(enemigo, mascota_P1);
    });

    if (mascota_P1.velocidad_X !== 0 || mascota_P1.velocidad_Y !== 0) {

        detenerEnBordesDelMapa(mascota_P1); //La mascota enemiga no se muestra en la consola ubuntu, solamente la mascota del 1mer usuario
    };
};

// Con estas funciones la mascota se mueve arriba, abajo, derecha o izquierda;

function mover(direccion) {

    if (direccion === "derecha") {
        mascota_P1.velocidad_X = velocidad_de_desplazamiento;

    } else if (direccion === "izquierda") {
        mascota_P1.velocidad_X = -velocidad_de_desplazamiento;

    } else if (direccion === "abajo") {
        mascota_P1.velocidad_Y = velocidad_de_desplazamiento;

    } else if (direccion === "arriba") {
        mascota_P1.velocidad_Y = -velocidad_de_desplazamiento;

    } else if (direccion === "detener") {
        mascota_P1.velocidad_X = 0;
        mascota_P1.velocidad_Y = 0;
    };
};

function moverConTeclas(e) {

    if(e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
        mover("derecha");

    } else if(e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
        mover("izquierda");

    } else if(e.key === "ArrowDown" || e.key === "S" || e.key === "s") {
        mover("abajo");

    } else if(e.key === "ArrowUp" || e.key === "W" || e.key === "w") {
        mover("arriba");

    };
};

function detenerMovimientoTeclas(e) {

    if (e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
        mover("detener");

    } else if (e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
        mover("detener");

    } else if (e.key === "ArrowDown" || e.key === "S" || e.key === "s") {
        mover("detener");

    } else if (e.key === "ArrowUp" || e.key === "W" || e.key === "w") {
        mover("detener");
        
    };
};

function removerObjetoDeArray_mascotas_enemigas(mascota_P1) { //Optimizado

    const mascotaIndex = mascotas_enemigas.findIndex((enemigo) => enemigo.nombre === mascota_P1.nombre);
    mascotas_enemigas.splice(mascotaIndex, 1);
};

function detectarColision(enemigo, jugador) {

    const enemigoDerecha = enemigo.x + enemigo.ancho - hitbox_img;
    const enemigoIzquierda = enemigo.x + hitbox_img;
    const enemigoAbajo = enemigo.y + enemigo.alto - hitbox_img;
    const enemigoArriba = enemigo.y + hitbox_img;

    const jugadorDerecha = jugador.x + jugador.ancho;
    const jugadorIzquierda = jugador.x;
    const jugadorAbajo = jugador.y + jugador.alto;
    const jugadorArriba = jugador.y;

    if (
        jugadorIzquierda > enemigoDerecha ||
        jugadorDerecha < enemigoIzquierda ||
        jugadorArriba > enemigoAbajo ||
        jugadorAbajo < enemigoArriba
    ) {
        return;
    };

    if (modo_de_juego == campaign_mode) {
        
        clearInterval(intervalo);
        mover('detener');
        seleccionarEnemigo(enemigo);
        secciones("none", "none", "none", "none", "flex", "none", "flex");
    
    } else if (modo_de_juego == multiplayer_mode) {

        clearInterval(intervalo);
        mover('detener');
        enemigoId = enemigo.id;
        console.log(enemigo);
        seleccionarEnemigo(enemigo)
        secciones("none", "none", "none", "none", "flex", "none", "flex");
    };
};

function detenerEnBordesDelMapa(jugador) {
    
    let izquierdaMapa = 0;
    let derechaMapa = mapa.width;
    let abajoMapa = mapa.height;
    let arribaMapa = 0;

    let izquierdaJugador = jugador.x;
    let derechaJugador = jugador.x + jugador.ancho;
    let abajoJugador = jugador.y + jugador.alto;
    let arribaJugador = jugador.y;

    if (izquierdaJugador < izquierdaMapa) {
        jugador.x = izquierdaMapa;
    };

    if (derechaJugador > derechaMapa) {
        jugador.x = derechaMapa - jugador.ancho;
    };

    if (abajoJugador > abajoMapa) {
        jugador.y = abajoMapa - jugador.alto;
    };

    if (arribaJugador < arribaMapa) {
        jugador.y = arribaMapa;
    };
};


function evitarColision(mascota_1, mascota_2) {

    const mascota_1Izquierda = mascota_1.x - hitbox_img;
    const mascota_1Derecha = mascota_1.x + mascota_1.ancho + hitbox_img;
    const mascota_1Arriba = mascota_1.y - hitbox_img;
    const mascota_1Abajo = mascota_1.y + mascota_1.alto + hitbox_img;

    const mascota_2Izquierda = mascota_2.x - hitbox_img;
    const mascota_2Derecha = mascota_2.x + mascota_2.ancho + hitbox_img;
    const mascota_2Arriba = mascota_2.y - hitbox_img;
    const mascota_2Abajo = mascota_2.y + mascota_2.alto + hitbox_img;

    if (
        mascota_1Izquierda > mascota_2Derecha ||
        mascota_1Derecha < mascota_2Izquierda ||
        mascota_1Arriba > mascota_2Abajo ||
        mascota_1Abajo < mascota_2Arriba
    ) {
        //No existe colisión
        return;
    };

    //Si hubo colisión
    console.log('Colision____________________');

    if (modo_de_juego == campaign_mode) {

        mascotas_canvas.forEach(mascota => {
            mascota.coordenadasAleatorias();
        });

        proceso();

    } else if (modo_de_juego == multiplayer_mode) {

        recolocar_mascotas_online();
    }
};


function proceso() {

    for (let i = 0; i < mascotas_canvas.length; i++) {

        for(let k = i + 1; k < mascotas_canvas.length; k++) {

            evitarColision(mascotas_canvas[i], mascotas_canvas[k]);
        };
    };
};

function recolocar_mascotas_online() { //Las coordenadas aleatorias deben aplicarse desde el servidor

    mascota_P1.coordenadasAleatorias();
    mascota_enemiga.coordenadasAleatorias();

    evitarColision(mascota_P1, mascota_enemiga);
};

//_______________________________________________________________________________________________________

function ejecutar_do_while() {

    let hubo_colision = true;

    do {

        hubo_colision = proceso2();
        
    } while (hubo_colision == true);
};

function evitarColision2(mascota_1, mascota_2) {

    const mascota_1Izquierda = mascota_1.x - hitbox_img;
    const mascota_1Derecha = mascota_1.x + mascota_1.ancho + hitbox_img;
    const mascota_1Arriba = mascota_1.y - hitbox_img;
    const mascota_1Abajo = mascota_1.y + mascota_1.alto + hitbox_img;

    const mascota_2Izquierda = mascota_2.x - hitbox_img;
    const mascota_2Derecha = mascota_2.x + mascota_2.ancho + hitbox_img;
    const mascota_2Arriba = mascota_2.y - hitbox_img;
    const mascota_2Abajo = mascota_2.y + mascota_2.alto + hitbox_img;

    if (
        mascota_1Izquierda > mascota_2Derecha ||
        mascota_1Derecha < mascota_2Izquierda ||
        mascota_1Arriba > mascota_2Abajo ||
        mascota_1Abajo < mascota_2Arriba
    ) {
        //No existe colisión
        console.log('Sin colisión');

    } else {

        //Si hubo colisión
        console.log('Colision____________________');
        return true;
    };
};

function proceso2() {

    mascotas_canvas.forEach(mascota => {
        mascota.coordenadasAleatorias();
    });

    function compararCoordenadas() {

        for (let i = 0; i < mascotas_canvas.length; i++) {

            for (let k = i + 1; k < mascotas_canvas.length; k++) {
    
                let hubo_colision = evitarColision2(mascotas_canvas[i], mascotas_canvas[k]);

                if (hubo_colision) {
                    return;
                } else {
                    hubo_colision = false;
                };
            };
        };

        if (!hubo_colision) {
            return false;
        }
        return hubo_colision;
    };

    let conclusion = compararCoordenadas();
    return conclusion;
};

//------------------------------------------------
window.addEventListener("load", iniciarJuego);

//Objetivos:
//
//          Recolocación de mascotas para evitar colisión
//          Preparar Node js y server, hacer prueba con dispositivos moviles.


//El usuario con pantalla chica generara sus coordenadas entre su ancho maximo y alto maximo de su mapa, por lo que no se generará su mascota aleatoria
//por todo el mapa, solamente en su cuadro chico. Aplicar dimensiones por default y luego...

//Aplicar esto a github

