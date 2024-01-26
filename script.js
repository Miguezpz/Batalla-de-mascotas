const section_1 = document.getElementById("section_1");
const section_mapa = document.getElementById("ver-mapa");
const section_2 = document.getElementById("section_2");
const section_3 = document.getElementById("section_3");
const section_4 = document.getElementById("section_4");
const div_caja_mascotas = document.getElementById("caja-mascotas");
const boton_seleccionar = document.getElementById("boton-seleccionar");
const caja_botones_ataque = document.getElementById("caja-botones-ataque");
const registro_ataques_J1 = document.getElementById("ataques-J1");
const registro_ataques_J2_CPU = document.getElementById("ataques-J2/CPU");
const boton_de_reiniciar = document.getElementById("boton-de-reiniciar");
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
let mascota_P2;
let mascota_CPU;
let ataques_P1 = [];
let ataques_P2;
let ataques_CPU = [];
let botones_ataques_P1;
let botones_por_su_class;
let ataques_seleccionados_P1 = [];
let ataques_seleccionados_P2 = [];
let ataques_aleatorios_CPU = [];
let victorias_P1 = 0;
let victorias_P2 = 0;
let victorias_CPU = 0;
let contador_de_ataques_seleccionados = 0;
let boton_presionado;
let intervalo;
let mascotas = [];
let mascotas_enemigas = [];
let mascotas_canvas = [];

//______________Dimensiones del Canvas_________________________________________

const devicePixelRatio = window.devicePixelRatio || 1;
let anchoMapa = window.innerWidth - 100;
const anchoMaximoMapa = 480;

if (anchoMapa > anchoMaximoMapa) {
    anchoMapa = anchoMaximoMapa;
};

let altoMapa = anchoMapa * 440 / anchoMaximoMapa;

mapa.width = anchoMapa;
mapa.height = altoMapa;

let size_img_mascota = anchoMapa * 50 / anchoMaximoMapa;

let hitbox_img = size_img_mascota * 50 / 100;
let velocidad_de_desplazamiento = mapa.width * 3 / anchoMaximoMapa;


// Clase--------------------------------------------------------------
class Mascotas {

    constructor(nombre, img, id, img_head, enemy_img_head) {

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

        this.mapaFoto2 = new Image();
        this.mapaFoto2.src = enemy_img_head;

        this.velocidad_X = 0;
        this.velocidad_Y = 0;
        this.cabezaFoto = new Image(); //Imagenes Platzi
        this.cabezaFoto.src = img_head; //Imagenes Platzi
    };

    pintarMascotaUsuario() {

        lienzo.drawImage(
            this.mapaFoto, 
            this.x, 
            this.y, 
            this.ancho, 
            this.alto
        );
    };

    pintarMascotaEnemigo() {

        lienzo.drawImage(
            this.mapaFoto2,
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

//Mascotas
let peluchin = new Mascotas(
    "Peluchin", "./resources/mascotas/peluchin.jpg", "peluchin_id", "/resources/mascotas_canvas/peluchin_sf.jpeg");
let sazu = new Mascotas(
    "Sazu", "./resources/mascotas/sazu.jpg", "sazu_id", "/resources/mascotas_canvas/sazu_sf.jpeg");
let aren = new Mascotas(
    "Aren", "./resources/mascotas/aren.png", "aren_id", "/resources/mascotas_canvas/aren_sf.jpeg");
let oreo = new Mascotas(
    "Oreo", "./resources/mascotas/oreo.jpg", "oreo_id", "/resources/mascotas_canvas/oreo_sf.jpeg");
let loro = new Mascotas(
    "Loro", "./resources/mascotas/loro.jpg", "loro_id", "/resources/mascotas_canvas/loro_sf.jpeg");
let guero = new Mascotas(
    "Güero", "./resources/mascotas/güero.jpg", "guero_id", "/resources/mascotas_canvas/guero_sf.jpeg");

//Mascotas Enemigas
let enemigo_peluchin = new Mascotas(
    "Peluchin", "./resources/mascotas/peluchin.jpg", "peluchin_id", "/resources/mascotas_canvas/peluchin_sf.jpeg");
let enemigo_sazu = new Mascotas(
    "Sazu", "./resources/mascotas/sazu.jpg", "sazu_id", "/resources/mascotas_canvas/sazu_sf.jpeg");
let enemigo_aren = new Mascotas(
    "Aren", "./resources/mascotas/aren.png", "aren_id", "/resources/mascotas_canvas/aren_sf.jpeg");
let enemigo_oreo = new Mascotas(
    "Oreo", "./resources/mascotas/oreo.jpg", "oreo_id", "/resources/mascotas_canvas/oreo_sf.jpeg");
let enemigo_loro = new Mascotas(
    "Loro", "./resources/mascotas/loro.jpg", "loro_id", "/resources/mascotas_canvas/loro_sf.jpeg");
let enemigo_guero = new Mascotas(
    "Güero", "./resources/mascotas/güero.jpg", "guero_id", "/resources/mascotas_canvas/guero_sf.jpeg");
    
mascotas.push(peluchin,sazu,aren,oreo,loro,guero);
mascotas_enemigas.push(enemigo_peluchin, enemigo_sazu, enemigo_aren, enemigo_oreo, enemigo_loro, enemigo_guero);

//Ataques
peluchin.ataques.push(piedra, piedra, piedra, papel, tijera);
sazu.ataques.push(piedra, piedra, piedra, papel, tijera);
aren.ataques.push(papel, papel, papel, tijera, piedra);
oreo.ataques.push(papel, papel, papel, tijera, piedra);
loro.ataques.push(tijera, tijera, tijera, piedra, papel);
guero.ataques.push(tijera, tijera, tijera, piedra, papel);

// Opciones: Gato Huaniqueo, (guero, mona), kong, regalito, la negra, (bobby, dinky, wanda), hueso, kaiser,
//claudia gato; pug de arturin;


//-----------------------------------------------------------------------------------------------------------------
function iniciarJuego() {

    secciones("flex", "none", "none", "none", "none");

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
};

function seleccionarMascota_P1() {

    if (input_radio_peluchin.checked) {
        mascota_P1 = peluchin;
        div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
        accionesPreviasModo_historia();
    } else if (input_radio_sazu.checked) {
        mascota_P1 = sazu;
        div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
        accionesPreviasModo_historia();
    } else if (input_radio_aren.checked) {
        mascota_P1 = aren;
        div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
        accionesPreviasModo_historia();
    } else if (input_radio_oreo.checked) {
        mascota_P1 = oreo;
        div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
        accionesPreviasModo_historia();
    } else if (input_radio_loro.checked) {
        mascota_P1 = loro;
        div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
        accionesPreviasModo_historia();
    } else if (input_radio_guero.checked) {
        mascota_P1 = guero;
        div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
        accionesPreviasModo_historia();
    }
};

function numeroAleatorio(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
};

function secciones(uno,canvas,dos,tres,cuatro) {

    section_1.style.display = uno;
    section_mapa.style.display = canvas;
    section_2.style.display = dos;
    section_3.style.display = tres;
    section_4.style.display = cuatro;
};

function mostrarVictorias(text1, text2) {
    div_victorias_J1.innerHTML = text1;
    div_victorias_J2_CPU.innerHTML = text2;
};

function accionesPreviasModo_historia() {

    secciones("none", "flex", "none", "none", "none");
    removerObjetoDeArray_mascotas_enemigas(mascota_P1);
    mascotas_canvas.push(mascota_P1, ...mascotas_enemigas); // Inyecto el jugador y los enemigos
    revisar_y_evitar_colisiones_aleatorias(); // Si hay colisión recoloca mascotas en el canvas
    iniciarMapa();
};

function seleccionarEnemigoAleatorio() {
   
    secciones("none", "none", "flex", "none", "flex");

    mascota_CPU = mascotas[numeroAleatorio(0, mascotas.length - 1)];
    div_nombre_mascota_J2_CPU.innerHTML = mascota_CPU.nombre;
    ataques_CPU.push(...mascota_CPU.ataques); //Spread operator (...)

    mostrarVictorias("🏆" + victorias_P1, "💀" + victorias_CPU);
    generarImagenesDeMascotas();
    generarBotonesDeAtaque();
};

function seleccionarEnemigoManual(enemigo) {
    
    mascota_CPU = mascotas[mascotas.findIndex(mascota => mascota.nombre === enemigo.nombre)]; //Optimizado
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
    
    ataques_P1.push(...mascota_P1.ataques); //Optimizado

    ataques_P1.forEach(x => {
        botones_ataques_P1 = `
            <button class="botones-generados">
                <img src="${x.img}" alt="${x.tipo}">   
            </button>
        `
        caja_botones_ataque.innerHTML += botones_ataques_P1;
        botones_por_su_class = document.querySelectorAll(".botones-generados img");

        botones_por_su_class.forEach(x => {

            x.parentNode.addEventListener("click", (e) => {

                boton_presionado = e.target.parentNode;
                
                if (e.target.attributes.src.value === piedra.img) {

                    boton_presionado.style.background = "rgba(0, 0, 0, 0.4)";
                    boton_presionado.disabled = true;
                    contador_de_ataques_seleccionados ++;
                    ataqueSeleccionado_P1(piedra.img);

                } else if (e.target.attributes.src.value === papel.img) {

                    boton_presionado.style.background = "rgba(0, 0, 0, 0.4)";
                    boton_presionado.disabled = true;
                    contador_de_ataques_seleccionados ++;
                    ataqueSeleccionado_P1(papel.img);

                } else if (e.target.attributes.src.value === tijera.img) {
                    
                    boton_presionado.style.background = "rgba(0, 0, 0, 0.4)";
                    boton_presionado.disabled = true;
                    contador_de_ataques_seleccionados ++;
                    ataqueSeleccionado_P1(tijera.img);
                }
            })
        })
    })

    //En este ejemplo, las imágenes se seleccionan usando document.querySelectorAll('.botones-generados img'), 
    //lo que devuelve una lista de todas las imágenes dentro de los botones generados. Luego, se itera sobre esta 
    //lista y se añade el EventListener correspondiente a cada imagen. Al hacer clic en la imagen, se comprueba su 
    //atributo alt en lugar de textContent, ya que el contenido del botón ahora incluye tanto la imagen como el emoji.
}

function ataqueSeleccionado_P1(x) {

    ataques_seleccionados_P1.push(x);

    function ataqueAleatorio_CPU () {
        let numero_random = numeroAleatorio(0, ataques_CPU.length - 1);
        ataques_aleatorios_CPU.push(ataques_CPU[numero_random].img);
        ataques_CPU.splice(numero_random, 1);
    }

    ataqueAleatorio_CPU();
    combate();
};

function combate() {

    if (contador_de_ataques_seleccionados === 5) {

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

    mascota_P1.pintarMascotaUsuario(); //Nuevo

    mascotas_enemigas.forEach(enemigo => {
        enemigo.pintarMascotaUsuario();
    });

    if(mascota_P1.velocidad_X !== 0 || mascota_P1.velocidad_Y !== 0) {

        detenerEnBordesDelMapa(mascota_P1);
        mascotas_enemigas.forEach(enemigo => {
            detectarColision(enemigo, mascota_P1);
        });
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
    }
}

function moverConTeclas(e) {

    if(e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
        mover("derecha");

    } else if(e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
        mover("izquierda");

    } else if(e.key === "ArrowDown" || e.key === "S" || e.key === "s") {
        mover("abajo");

    } else if(e.key === "ArrowUp" || e.key === "W" || e.key === "w") {
        mover("arriba");

    }
};

function detenerMovimientoTeclas(e) {

    if(e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
        mover("detener");

    } else if(e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
        mover("detener");

    } else if(e.key === "ArrowDown" || e.key === "S" || e.key === "s") {
        mover("detener");

    } else if(e.key === "ArrowUp" || e.key === "W" || e.key === "w") {
        mover("detener");
        
    }
};

function removerObjetoDeArray_mascotas_enemigas(seleccion) { //Optimizado

    const mascotaIndex = mascotas_enemigas.findIndex(mascota => mascota.nombre === seleccion.nombre);
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

    let colisiones = [];

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
        colisiones.push('Colision');
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

        console.log('Se ejecutó el ciclo do while');

        if (colisiones.length > 0) {

            colisiones.splice(0, colisiones.length);
            console.log('Se eliminaron los elementos del array colisiones, colisiones = ', colisiones.length);
        };

        generar_y_comparar_coordenadas();

        console.log('Colisiones detectados = ', colisiones.length);

    } while (colisiones.length > 0);

    console.log('SIN COLISIONES');
};
//------------------------------------------------
window.addEventListener("load", iniciarJuego);

/* 'He descubierto un error, cuando presiono sobre un ataque especificamente en el borde el botón entonces genera un error en la consola,
 debo averiguar como hacer que aunque se haga click en la orilla del botón se accione el botón correspondiente' */

 // Lo anterior ya lo resolví, y el código se encuentra en la carpeta curso_terminado;