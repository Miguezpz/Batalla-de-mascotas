//secciones de HTML
const section_1 = document.getElementById("section_1");
const section_mapa = document.getElementById("ver-mapa");
const section_2 = document.getElementById("section_2");
const section_3 = document.getElementById("section_3");
const section_4 = document.getElementById("section_4");

//botones
const boton_seleccionar = document.getElementById("boton-seleccionar");
const boton_de_reiniciar = document.getElementById("boton-de-reiniciar");
let boton_presionado;
let botones_ataques_P1;
let botones_por_su_class;

//divs
const caja_botones_ataque = document.getElementById("caja-botones-ataque");
const registro_ataques_J1 = document.getElementById("ataques-J1");
const registro_ataques_J2_CPU = document.getElementById("ataques-J2/CPU");
const div_caja_mascotas = document.getElementById("caja-mascotas");
const div_resultado_del_combate = document.getElementById("resultado-del-combate")
const div_nombre_mascota_J1 = document.getElementById("nombre-mascota-J1");
const div_nombre_mascota_J2_CPU = document.getElementById("nombre-mascota-J2/CPU");
const div_img_mascota_J1 = document.getElementById("img-J1");
const div_img_mascota_J2_CPU = document.getElementById("img-J2/CPU");
const div_victorias_J1 = document.getElementById("victorias-J1");
const div_victorias_J2_CPU = document.getElementById("victorias-J2/CPU");

//radio inputs de mascotas
let input_radio_peluchin;
let input_radio_sazu;
let input_radio_aren;
let input_radio_oreo;
let input_radio_loro;
let input_radio_guero;

//players
let mascota_P1;
let mascota_P2;
let mascota_CPU;

//otros
let ataques_P2;
let victorias_P1 = 0;
let victorias_P2 = 0;
let victorias_CPU = 0;
let contador_de_ataques_seleccionados = 0;
let intervalo;
let game_mode;

//arrays
let ataques_P1 = [];
let ataques_CPU = [];
let ataques_seleccionados_P1 = [];
let ataques_seleccionados_P2 = [];
let ataques_aleatorios_CPU = [];
let mascotas = [];
let mascotas_canvas = [];

//______________Configuración del Canvas_________________________________________

const mapa = document.getElementById("mapa");
const ctx = mapa.getContext("2d");
ctx.imageSmoothingEnabled = true;

const mapa_background = new Image();
mapa_background.src = "./resources/assets/mokemap.png";

const margin_dinamico_width = window.innerWidth * 0.1; //Es el 10% del ancho de window.
const ancho_ajustado_dinamico = window.innerWidth - margin_dinamico_width; //Ancho de window menos su 10%

let anchoMapaCanvas = ancho_ajustado_dinamico;

const anchoMaximoMapaCanvas = 480;
const altoMaximoMapaCanvas = 440;

if (anchoMapaCanvas > anchoMaximoMapaCanvas) {
    anchoMapaCanvas = anchoMaximoMapaCanvas;
};

let altoMapaCanvas = anchoMapaCanvas * altoMaximoMapaCanvas / anchoMaximoMapaCanvas;

mapa.width = anchoMapaCanvas;
mapa.height = altoMapaCanvas;

const tamano_imagen_mascota = 65;
const tamano_dinamico_imagen_mascota = anchoMapaCanvas * tamano_imagen_mascota / anchoMaximoMapaCanvas;

let hitbox_porcentual_img = 30; //representa el 30% de la imagen de la mascota
let hitbox_img = tamano_dinamico_imagen_mascota * hitbox_porcentual_img / 100; //Representa el % de hitbox_img de tamano_dinamico_imagen_mascota

let velocidad_de_desplazamiento = 3;
let velocidad_de_desplazamiento_dinamico = mapa.width * velocidad_de_desplazamiento / anchoMaximoMapaCanvas;


// Clase--------------------------------------------------------------
class Mascotas {

    constructor(nombre, img, id, img_head_src, enemy_img_head_src) {

        this.nombre = nombre;
        this.img = img;
        this.id = id;
        this.ataques = [];

        this.ancho = tamano_dinamico_imagen_mascota;
        this.alto = tamano_dinamico_imagen_mascota;
        this.x = numeroAleatorio(0, mapa.width - this.ancho);
        this.y = numeroAleatorio(0, mapa.height - this.alto);
        
        this.img_head_canvas = new Image(); 
        this.img_head_canvas.src = img_head_src;

        this.img_head_canvas_enemy = new Image();
        this.img_head_canvas_enemy.src = enemy_img_head_src;

        this.velocidad_X = 0;
        this.velocidad_Y = 0;
    };

    pintarMascotaUsuario() {

        ctx.drawImage(
            this.img_head_canvas, 
            this.x, 
            this.y, 
            this.ancho, 
            this.alto
        );
    };

    pintarMascotaEnemigo() {

        ctx.drawImage(
            this.img_head_canvas_enemy,
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

//Mascotas
let peluchin = new Mascotas(
    "Peluchin", "./resources/mascotas/peluchin.jpg", "peluchin_id", "/resources/mascotas_canvas/jugador/h_peluchin.jpg", '/resources/mascotas_canvas/enemigo/h_peluchin_enemigo.webp');
let sazu = new Mascotas(
    "Sazu", "./resources/mascotas/sazu.jpg", "sazu_id", "/resources/mascotas_canvas/jugador/h_sazu.jpg", '/resources/mascotas_canvas/enemigo/h_sazu_enemigo.webp');
let aren = new Mascotas(
    "Aren", "./resources/mascotas/aren.png", "aren_id", "/resources/mascotas_canvas/jugador/h_aren.jpg", '/resources/mascotas_canvas/enemigo/h_aren_enemigo.webp');
let oreo = new Mascotas(
    "Oreo", "./resources/mascotas/oreo.jpg", "oreo_id", "/resources/mascotas_canvas/jugador/h_oreo.jpg", '/resources/mascotas_canvas/enemigo/h_oreo_enemigo.webp');
let loro = new Mascotas(
    "Loro", "./resources/mascotas/loro.jpg", "loro_id", "/resources/mascotas_canvas/jugador/h_loro.jpg", '/resources/mascotas_canvas/enemigo/h_loro_enemigo.webp');
let guero = new Mascotas(
    "Güero", "./resources/mascotas/güero.jpg", "guero_id", "/resources/mascotas_canvas/jugador/h_guero.jpg", '/resources/mascotas_canvas/enemigo/h_guero_enemigo.webp');
    
mascotas.push(peluchin,sazu,aren,oreo,loro,guero);

//Ataques
const piedra = {tipo:"piedra", img:"./resources/ataques/piedra.webp"};
const papel = {tipo:"papel", img:"./resources/ataques/papel.webp"};
const tijera = {tipo:"tijera", img:"./resources/ataques/tijeras.webp"};

//La cantidad de ataques en cada set debe ser igual
const set_ataques_1 = [piedra, piedra, papel, tijera];
const set_ataques_2 = [papel, papel, tijera, piedra];
const set_ataques_3 = [tijera, tijera, piedra, papel];

let cantidad_de_ataques_por_set = (set_ataques_1.length + set_ataques_2.length + set_ataques_3.length) / 3;

peluchin.ataques.push(...set_ataques_1);
sazu.ataques.push(...set_ataques_1);
aren.ataques.push(...set_ataques_2);
oreo.ataques.push(...set_ataques_2);
loro.ataques.push(...set_ataques_3);
guero.ataques.push(...set_ataques_3);

//-----------------------------------------------------------------------------------------------------------------
function iniciarJuego() {

    game_mode = 'campaigne';

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

    secciones("flex", "none", "none", "none", "none");
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
    accionesPreviasModo_historia();
};

function numeroAleatorio(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
};

function secciones(select_mascota, canvas, atqs, result_reload, panel_combate) {

    section_1.style.display = select_mascota;
    section_mapa.style.display = canvas;
    section_2.style.display = atqs;
    section_3.style.display = result_reload;
    section_4.style.display = panel_combate;
};

function mostrarVictorias(victorias_jugador, victorias_enemigo) {

    div_victorias_J1.innerHTML = victorias_jugador;
    div_victorias_J2_CPU.innerHTML = victorias_enemigo;
};

function accionesPreviasModo_historia() {

    if (game_mode === 'campaigne') {
        //index_mascota_P1 guarda la posición del elemento que tiene el mismo nombre que la mascota seleccionada por el jugador.
        let index_mascota_P1 = mascotas.findIndex((mscta) => mscta.nombre === mascota_P1.nombre);
        //Aquí remuevo la mascota identica a la del jugador usando el método .splice del array mascotas.
        mascotas.splice(index_mascota_P1, 1);
        /*Guardo los elementos restantes del array mascotas y la mascota seleccionada por el usuario en el array mascotas_canvas,
        este array solo se utiliza en la función revisar_y_evitar_colisiones_aleatorias()*/
        mascotas_canvas.push(mascota_P1, ...mascotas);

        revisar_y_evitar_colisiones_aleatorias(); // Si hay colisión recoloca mascotas en el canvas
        secciones("none", "flex", "none", "none", "none");
        iniciarMapa();
    };
};

function seleccionarEnemigoAleatorio() {
   
    mascota_CPU = mascotas[numeroAleatorio(0, mascotas.length - 1)];
    div_nombre_mascota_J2_CPU.innerHTML = mascota_CPU.nombre;
    ataques_CPU.push(...mascota_CPU.ataques); //Spread operator (...)

    mostrarVictorias("🏆" + victorias_P1, "💀" + victorias_CPU);
    generarImagenesDeMascotas();
    generarBotonesDeAtaque();
    secciones("none", "none", "flex", "none", "flex");
};

function seleccionarEnemigoManual(enemigo) {
    
    mascota_CPU = mascotas[mascotas.findIndex(mascota => mascota.nombre === enemigo.nombre)]; //Optimizado //Fijate que aquí no se utiliza el array mascotas_enemigas
    div_nombre_mascota_J2_CPU.innerHTML = mascota_CPU.nombre;
    ataques_CPU.push(...mascota_CPU.ataques); //Spread operator (...)

    mostrarVictorias("🏆" + victorias_P1, "💀" + victorias_CPU);
    generarImagenesDeMascotas();
    generarBotonesDeAtaque();
};

function generarImagenesDeMascotas() {

    let imagen_mascota_J1 = `
        <img src="${mascota_P1.img}" alt="${mascota_P1.nombre}" class="mascota-seleccionada">
    `;

    let imagen_mascota_J2_CPU = `
        <img src="${mascota_CPU.img}" alt="${mascota_CPU.nombre}" class="mascota-seleccionada">
    `;

    div_img_mascota_J1.innerHTML = imagen_mascota_J1;
    div_img_mascota_J2_CPU.innerHTML = imagen_mascota_J2_CPU;
};

function generarBotonesDeAtaque() {
    
    // Agrega todos los ataques de la mascota del jugador 1 al array ataques_P1
    ataques_P1.push(...mascota_P1.ataques);

    // Itera sobre el array ataques_P1 para crear un botón por cada ataque.
    ataques_P1.forEach(x => {
        botones_ataques_P1 = `
            <button class="botones-generados">
                <img src="${x.img}" alt="${x.tipo}">   
            </button>
        `;

        // Añade el botón creado al HTML contenedor de los botones de ataque.
        caja_botones_ataque.innerHTML += botones_ataques_P1;
        botones_por_su_class = document.querySelectorAll(".botones-generados img");

        botones_por_su_class.forEach(x => {

            x.parentNode.addEventListener("click", (e) => {

                /*La primer condición representa el boton ligado al div. La 2da representa el boton ligado al img.
                El orden de las condiciones importa ya que las propiedades de la 1ra condicion solo las posee el div*/
                boton_presionado = e.target.lastElementChild ?.parentNode || e.target.parentNode;
                
                // Obtiene el valor de 'alt' de la imagen, independientemente de dónde se hizo clic.
                let alt_img = e.target.firstElementChild?.alt || e.target.alt; //Buscamos alt en el elemento del div o en el botón que contiene la img.
                console.log(alt_img);
                let seleccion_ataque_jugador;
                
                // Determina la imagen de ataque seleccionada basándose en el valor de 'alt'.
                if (alt_img === 'piedra') {
                    seleccion_ataque_jugador = piedra.img;

                } else if (alt_img === 'papel') {
                    seleccion_ataque_jugador = papel.img;

                } else if (alt_img === 'tijera') {
                    seleccion_ataque_jugador = tijera.img;

                } else {
                    return;
                };

                // Cambia el estilo del botón para indicar que ha sido seleccionado y lo deshabilita.
                boton_presionado.style.background = "rgba(0, 0, 0, 0.4)";
                boton_presionado.disabled = true;

                // Incrementa el contador de ataques seleccionados.
                contador_de_ataques_seleccionados ++;

                // Llama a la función que maneja el ataque seleccionado por el jugador 1.
                ataqueSeleccionado_P1(seleccion_ataque_jugador);
            });
        });
    });
};

function ataqueSeleccionado_P1(x) {

    ataques_seleccionados_P1.push(x);

    function ataqueAleatorio_CPU () {
        let numero_random = numeroAleatorio(0, ataques_CPU.length - 1);
        ataques_aleatorios_CPU.push(ataques_CPU[numero_random].img);
        ataques_CPU.splice(numero_random, 1);
    };

    ataqueAleatorio_CPU();
    combate();
};

function combate() {

    if (contador_de_ataques_seleccionados === cantidad_de_ataques_por_set) {

        for (let i = 0; i < 5; i ++) {

            if (ataques_seleccionados_P1[i] === piedra.img && ataques_aleatorios_CPU[i] === tijera.img) {

                victorias_P1 ++;

            } else if (ataques_seleccionados_P1[i] === tijera.img && ataques_aleatorios_CPU[i] === papel.img) {

                victorias_P1 ++;

            } else if (ataques_seleccionados_P1[i] === papel.img && ataques_aleatorios_CPU[i] === piedra.img) {

                victorias_P1 ++;

            } else if (ataques_seleccionados_P1[i] === ataques_aleatorios_CPU[i]){

                //Empate- No hay acción;

            } else {
                victorias_CPU ++;
            }
        };

        if (victorias_P1 > victorias_CPU) {
            resultadoCombate("🍕¡Ganaste!🍕");
        } else if (victorias_P1 < victorias_CPU) {
            resultadoCombate("Perdiste😪");
        } else if (victorias_P1 === victorias_CPU) {
            resultadoCombate("Empate🦧");
        }

        mostrarVictorias("🏆" + victorias_P1, "💀" + victorias_CPU);
        secciones("none", "none", "flex", "flex", "flex");
    }
}

function resultadoCombate(text) {

    div_resultado_del_combate.innerHTML = text;
    imprimirAtaques();
};

function imprimirAtaques() {

    for (let i = 0; i < ataques_P1.length; i++) {

        let parrafo1 = document.createElement("p");
        let parrafo2 = document.createElement("p");

        parrafo1.innerHTML = `<img src="${ataques_seleccionados_P1[i]}" class="imagen-ataque-seleccionado">`;
        parrafo2.innerHTML = `<img src="${ataques_aleatorios_CPU[i]}" class="imagen-ataque-seleccionado">`; //-- Ajustado a CPU y no a J2.

        parrafo1.classList.add("cuadro-ataque-seleccionado");
        parrafo2.classList.add("cuadro-ataque-seleccionado");

        registro_ataques_J1.appendChild(parrafo1);
        registro_ataques_J2_CPU.appendChild(parrafo2);
    };
};

//Canvas; Es el mapa en el que se desplaza la mascota seleccionada
function iniciarMapa() {

    intervalo = setInterval(pintarCanvas, 10);
    window.addEventListener("keydown", moverConTeclas);
    window.addEventListener("keyup", detenerMovimientoTeclas);
};

//Aquí dibujo las mascotas y el fondo sobre el ctx Canvas, muevo los objetos y detecto colisiones.
function pintarCanvas() {
    
    ctx.clearRect(0, 0, mapa.width, mapa.height);

    mascota_P1.x = mascota_P1.x + mascota_P1.velocidad_X;
    mascota_P1.y = mascota_P1.y + mascota_P1.velocidad_Y;

    ctx.drawImage(
        mapa_background,
        0,
        0,
        mapa.width,
        mapa.height
    );

    mascota_P1.pintarMascotaUsuario();

    mascotas.forEach(enemigo => {
        enemigo.pintarMascotaEnemigo();
    });

    if (mascota_P1.velocidad_X !== 0 || mascota_P1.velocidad_Y !== 0) {

        detenerEnBordesDelMapa(mascota_P1);
        mascotas.forEach(enemigo => {
            detectarColision(enemigo, mascota_P1);
        });
    };
};

// Con estas funciones la mascota se mueve arriba, abajo, derecha o izquierda;

function mover(direccion) {

    if (direccion === "derecha") {
        mascota_P1.velocidad_X = velocidad_de_desplazamiento_dinamico;

    } else if (direccion === "izquierda") {
        mascota_P1.velocidad_X = -velocidad_de_desplazamiento_dinamico;

    } else if (direccion === "abajo") {
        mascota_P1.velocidad_Y = velocidad_de_desplazamiento_dinamico;

    } else if (direccion === "arriba") {
        mascota_P1.velocidad_Y = -velocidad_de_desplazamiento_dinamico;

    } else if (direccion === "detener") {
        mascota_P1.velocidad_X = 0;
        mascota_P1.velocidad_Y = 0;
    }
}

function moverConTeclas(e) {

    if (e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
        mover("derecha");

    } else if (e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
        mover("izquierda");

    } else if (e.key === "ArrowDown" || e.key === "S" || e.key === "s") {
        mover("abajo");

    } else if (e.key === "ArrowUp" || e.key === "W" || e.key === "w") {
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

    mover('detener');
    clearInterval(intervalo);
    secciones("none", "none", "flex", "none", "flex");
    seleccionarEnemigoManual(enemigo);
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

function revisar_y_evitar_colisiones_aleatorias() {

    let colisiones = 0;

    function evitarColision(mascota_1, mascota_2) {

        const mascota_1Izquierda = mascota_1.x - hitbox_img;
        const mascota_1Derecha = mascota_1.x + mascota_1.ancho + hitbox_img;
        const mascota_1Arriba = mascota_1.y - hitbox_img;
        const mascota_1Abajo = mascota_1.y + mascota_1.alto;
    
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
        colisiones++;
    };
    
    function generar_y_comparar_coordenadas() {

        mascotas_canvas.forEach(mascota => {
            mascota.coordenadasAleatorias();
        });
    
        for (let i = 0; i < mascotas_canvas.length; i++) {
    
            for (let k = i + 1; k < mascotas_canvas.length; k++) {
    
                evitarColision(mascotas_canvas[i], mascotas_canvas[k]);
            };
        };
    };

    do {

        if (colisiones > 0) {
            colisiones = 0;
        };

        generar_y_comparar_coordenadas();

    } while (colisiones > 0);
};
//------------------------------------------------
window.addEventListener("load", iniciarJuego);

/* 'He descubierto un error, cuando presiono sobre un ataque especificamente en el borde el botón entonces genera un error en la consola,
 debo averiguar como hacer que aunque se haga click en la orilla del botón se accione el botón correspondiente' */

 // Lo anterior ya lo resolví, y el código se encuentra en la carpeta curso_terminado;

 /*Objetivo actual: 
    Crear modo campaña del mapa.

    Cuando chocas con un enemigo entonces .splice esa mascota
    Si ganas el combate
    Si enemigos left = 0    si enemigos > 0           empate
    boton = 'reiniciar'      boton = 'continuar'     boton = 'repetir'

    boton continuar...

    regresa el usuario al mapa (podemos reutilizar evitarColision),

 */

/* No olvides el código para limpiar un array: mi_array.splice(0, mi_array.length) */