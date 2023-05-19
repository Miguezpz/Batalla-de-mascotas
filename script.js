class Batalla_de_mascotas {
    constructor(nombre, img, id, especialidad) {
        this.nombre = nombre;
        this.img = img;
        this.id = id;
        this.especialidad = especialidad;
        this.ataques = [];
    }
}

const section_1 = document.getElementById("section_1");
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
let input_radio_peluchin;
let input_radio_sazu;
let input_radio_aren;
let input_radio_oreo;
let input_radio_kong;
let input_radio_toby;
let mascota_P1;
let mascota_P2;
let mascota_CPU;
let ataques_P1;
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
let boton;

const piedra = {emoji:"🪨", tipo:"piedra", img:"./resources/assets/piedra.png"};
const papel = {emoji:"📃", tipo:"papel", img:"./resources/assets/papel.png"};
const tijera = {emoji:"✂️", tipo:"tijera", img:"./resources/assets/tijeras.png"};

//Mascotas
let mascotas = [];
let peluchin = new Batalla_de_mascotas("Peluchin", "./resources/assets/demo.jpg", "peluchin_id", "piedra");
let sazu = new Batalla_de_mascotas("Sazu", "./resources/assets/demo.jpg", "sazu_id", "piedra");
let aren = new Batalla_de_mascotas("Aren", "./resources/assets/demo.jpg", "aren_id", "papel");
let oreo = new Batalla_de_mascotas("Oreo", "./resources/assets/demo.jpg", "oreo_id", "papel");
let kong = new Batalla_de_mascotas("Kong", "./resources/assets/demo.jpg", "kong_id", "tijera");
let toby = new Batalla_de_mascotas("Toby", "./resources/assets/demo.jpg", "toby_id", "tijera");

mascotas.push(peluchin,sazu,aren,oreo,kong,toby);

//Ataques
peluchin.ataques.push(piedra, piedra, piedra, papel, tijera);
sazu.ataques.push(piedra, piedra, piedra, papel, tijera);
aren.ataques.push(papel, papel, papel, tijera, piedra);
oreo.ataques.push(papel, papel, papel, tijera, piedra);
kong.ataques.push(tijera, tijera, tijera, piedra, papel);
toby.ataques.push(tijera, tijera, tijera, piedra, papel);

// Opciones: Gato Huaniqueo, (guero, mona), kong, regalito, la negra, (bobby, dinky, wanda), hueso, kaiser,
//claudia gato; pug de arturin;


//-----------------------------------------------------------------------------------------------------------------
function iniciarJuego() {

    secciones("flex", "none", "none", "none");

    mascotas.forEach(x => {
        let estructura = `
            <label for="${x.id}" class="label-mascota"><img src="${x.img}" alt="${x.nombre}">${x.nombre}</label>
            <input type="radio" id="${x.id}" name="enlace" class="input-mascotas">
        `
        div_caja_mascotas.innerHTML += estructura;
    });
    
    input_radio_peluchin = document.getElementById("peluchin_id");
    input_radio_sazu = document.getElementById("sazu_id");
    input_radio_aren = document.getElementById("aren_id");
    input_radio_oreo = document.getElementById("oreo_id");
    input_radio_kong = document.getElementById("kong_id");
    input_radio_toby = document.getElementById("toby_id");

    boton_seleccionar.addEventListener("click", seleccionarMascota_P1);
    boton_de_reiniciar.addEventListener("click", _ => location.reload());
};

function seleccionarMascota_P1() {
    if (input_radio_peluchin.checked) {
        mascota_P1 = peluchin;
        div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
        seleccionarMascota_CPU()
    } else if (input_radio_sazu.checked) {
        mascota_P1 = sazu;
        div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
        seleccionarMascota_CPU()
    } else if (input_radio_aren.checked) {
        mascota_P1 = aren;
        div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
        seleccionarMascota_CPU()
    } else if (input_radio_oreo.checked) {
        mascota_P1 = oreo;
        div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
        seleccionarMascota_CPU()
    } else if (input_radio_kong.checked) {
        mascota_P1 = kong;
        div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
        seleccionarMascota_CPU()
    } else if (input_radio_toby.checked) {
        mascota_P1 = toby;
        div_nombre_mascota_J1.innerHTML = mascota_P1.nombre;
        seleccionarMascota_CPU()
    }
}

function numeroAleatorio(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
}

function secciones(uno,dos,tres,cuatro) {

    section_1.style.display = uno;
    section_2.style.display = dos;
    section_3.style.display = tres;
    section_4.style.display = cuatro;
}

function mostrarVictorias(text1, text2) {
    div_victorias_J1.innerHTML = text1;
    div_victorias_J2_CPU.innerHTML = text2;
};

function seleccionarMascota_CPU() {

    mascota_CPU = mascotas[numeroAleatorio(0, mascotas.length - 1)];
    div_nombre_mascota_J2_CPU.innerHTML = mascota_CPU.nombre;
    ataques_CPU.push(...mascota_CPU.ataques); //Spread operator (...)
    mostrarVictorias("🏆" + victorias_P1, "💀" + victorias_CPU);
    secciones("none", "flex", "none", "flex");
    generarImagenesDeMascotas();
    generarBotonesDeAtaque();
}

function generarImagenesDeMascotas() {

    let imagen_mascota_J1 = `
        <img src="${mascota_P1.img}" alt="${mascota_P1.nombre}">
    `;

    let imagen_mascota_J2_CPU = `
        <img src="${mascota_CPU.img}" alt="${mascota_CPU.nombre}">
    `;

    div_img_mascota_J1.innerHTML = imagen_mascota_J1;
    div_img_mascota_J2_CPU.innerHTML = imagen_mascota_J2_CPU;
};

function generarBotonesDeAtaque() {
    
    ataques_P1 = mascota_P1.ataques;

    ataques_P1.forEach(x => {
        botones_ataques_P1 = `
            <button class="botones-generados">
                <img src="${x.img}" alt="${x.emoji}">   
            </button>
        `
        caja_botones_ataque.innerHTML += botones_ataques_P1;
        botones_por_su_class = document.querySelectorAll(".botones-generados img");

        botones_por_su_class.forEach(x => {
            x.addEventListener("click", (e) => {

                console.log(e);
                boton = e.target.parentNode;

                if (e.target.alt === "🪨") {
                    boton.style.background = "grey";
                    boton.disabled = true;
                    contador_de_ataques_seleccionados ++;
                    ataqueSeleccionado_P1("🪨");
                } else if (e.target.alt === "📃") {
                    boton.style.background = "grey";
                    boton.disabled = true;
                    contador_de_ataques_seleccionados ++;
                    ataqueSeleccionado_P1("📃");
                } else if (e.target.alt === "✂️") {
                    boton.style.background = "grey";
                    boton.disabled = true;
                    contador_de_ataques_seleccionados ++;
                    ataqueSeleccionado_P1("✂️");
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
        ataques_aleatorios_CPU.push(ataques_CPU[numero_random].emoji);
        ataques_CPU.splice(numero_random, 1);
    }

    ataqueAleatorio_CPU();
    combate();
};

function combate() {

    if (contador_de_ataques_seleccionados === 5) {

        for (let i = 0; i < 5; i ++) {

            if (ataques_seleccionados_P1[i] === "🪨" && ataques_aleatorios_CPU[i] === "✂️") {

                victorias_P1 ++;

            } else if (ataques_seleccionados_P1[i] === "✂️" && ataques_aleatorios_CPU[i] === "📃") {

                victorias_P1 ++;

            } else if (ataques_seleccionados_P1[i] === "📃" && ataques_aleatorios_CPU[i] === "🪨") {

                victorias_P1 ++;

            } else if (ataques_seleccionados_P1[i] === ataques_aleatorios_CPU[i]){

                //Empate- No hay acción;

            } else {
                victorias_CPU ++;
            }
        };

        if (victorias_P1 > victorias_CPU) {
            resultadoCombate("Ganaste");
        } else if (victorias_P1 < victorias_CPU) {
            resultadoCombate("Perdiste");
        } else if (victorias_P1 === victorias_CPU) {
            resultadoCombate("Empate");
        }

        mostrarVictorias("🏆" + victorias_P1, "💀" + victorias_CPU);
        secciones("none", "flex", "flex", "flex");
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

        parrafo1.innerHTML = ataques_seleccionados_P1[i];
        parrafo2.innerHTML = ataques_aleatorios_CPU[i]; //-- Ajustado a CPU y no a J2.

        registro_ataques_J1.appendChild(parrafo1);
        registro_ataques_J2_CPU.appendChild(parrafo2);
    };
};

//------------------------------------------------
window.addEventListener("load", iniciarJuego);