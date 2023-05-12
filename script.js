class Batalla_de_mascotas {
    constructor(nombre, img, id, especialidad) {
        this.nombre = nombre;
        this.img = img;
        this.id = id;
        this.especialidad = especialidad;
        this.ataques = [];
    }
}

const caja_mascotas = document.getElementById("caja-mascotas");
const boton_seleccionar = document.getElementById("boton-seleccionar");
const caja_botones_ataque = document.getElementById("caja-botones-ataque");
const registro_ataques_J1 = document.getElementById("ataques-J1");
const registro_ataques_J2_CPU = document.getElementById("ataques-J2/CPU");
let input_radio_peluchin;
let input_radio_sazu;
let input_radio_aren;
let input_radio_oreo;
let input_radio_harry;
let input_radio_toby;
let mascota_P1;
let mascota_P2;
let mascota_CPU;
let ataques_P1;
let botones_ataques_P1;
let botones_por_su_class;
let ataques_seleccionados_P1 = [];


let piedra = {emoji:"🪨", tipo:"piedra"};
let papel = {emoji:"📃", tipo:"papel"};
let tijera = {emoji:"✂️", tipo:"tijera"};

//Mascotas
let mascotas = [];
let peluchin = new Batalla_de_mascotas("Peluchin", "null", "peluchin_id", "piedra");
let sazu = new Batalla_de_mascotas("Sazu", "null", "sazu_id", "piedra");
let aren = new Batalla_de_mascotas("Aren", "null", "aren_id", "papel");
let oreo = new Batalla_de_mascotas("Oreo", "null", "oreo_id", "papel");
let harry = new Batalla_de_mascotas("Harry", "null", "harry_id", "tijera");
let toby = new Batalla_de_mascotas("Toby", "null", "toby_id", "tijera");

mascotas.push(peluchin,sazu,aren,oreo,harry,toby);

//Ataques
peluchin.ataques.push(piedra, piedra, piedra, papel, tijera);
sazu.ataques.push(piedra, piedra, piedra, papel, tijera);
aren.ataques.push(papel, papel, papel, tijera, piedra);
oreo.ataques.push(papel, papel, papel, tijera, piedra);
harry.ataques.push(tijera, tijera, tijera, piedra, papel);
toby.ataques.push(tijera, tijera, tijera, piedra, papel);

// Opciones: Gato Huaniqueo, (guero, mona), kong, regalito, la negra, (bobby, dinky, wanda), hueso, kaiser,
//claudia gato; pug de arturin;


//-----------------------------------------------------------------------------------------------------------------
function iniciarJuego() {
    mascotas.forEach(x => {
        let estructura = `
            <label for="${x.id}">${x.nombre}</label>
            <input type="radio" id="${x.id}" name="enlace">
        `
        caja_mascotas.innerHTML += estructura;
    });
    
    input_radio_peluchin = document.getElementById("peluchin_id");
    input_radio_sazu = document.getElementById("sazu_id");
    input_radio_aren = document.getElementById("aren_id");
    input_radio_oreo = document.getElementById("oreo_id");
    input_radio_harry = document.getElementById("harry_id");
    input_radio_toby = document.getElementById("toby_id");

    boton_seleccionar.addEventListener("click", seleccionarMascota_P1);
};

function seleccionarMascota_P1() {
    if (input_radio_peluchin.checked) {
        mascota_P1 = peluchin;
        seleccionarMascota_CPU()
    } else if (input_radio_sazu.checked) {
        mascota_P1 = sazu;
        seleccionarMascota_CPU()
    } else if (input_radio_aren.checked) {
        mascota_P1 = aren;
        seleccionarMascota_CPU()
    } else if (input_radio_oreo.checked) {
        mascota_P1 = oreo;
        seleccionarMascota_CPU()
    } else if (input_radio_harry.checked) {
        mascota_P1 = harry;
        seleccionarMascota_CPU()
    } else if (input_radio_toby.checked) {
        mascota_P1 = toby;
        seleccionarMascota_CPU()
    }
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionarMascota_CPU() {

    mascota_CPU = mascotas[numeroAleatorio(0, mascotas.length - 1)];
    console.log(mascota_P1.nombre + " " + mascota_CPU.nombre);
    generarBotonesDeAtaque();
}

function generarBotonesDeAtaque() {
    
    ataques_P1 = mascota_P1.ataques;

    ataques_P1.forEach(x => {
        botones_ataques_P1 = `
            <button class="enlace2">${x.emoji}</button>
        `
        caja_botones_ataque.innerHTML += botones_ataques_P1;
        botones_por_su_class = document.querySelectorAll(".enlace2");

        botones_por_su_class.forEach(x => {
            x.addEventListener("click", (e) => {
                console.log(e);

                if (e.target.textContent === "🪨") {
                    ataques_seleccionados_P1.push("🪨");
                    mensajes(ataques_P1[0].emoji, "ok");
                    x.disabled = true;
                } else if (e.target.textContent === "📃") {
                    ataques_seleccionados_P1.push("📃");
                    x.disabled = true;
                } else if (e.target.textContent === "✂️") {
                    ataques_seleccionados_P1.push("✂️");
                    x.disabled = true;
                }
            })
        })
    })
}

function mensajes(x, y) {

    let parrafo1 = document.createElement("p");
    let parrafo2 = document.createElement("p");

    parrafo1.innerHTML = x;
    parrafo2.innerHTML = y;

    registro_ataques_J1.appendChild(parrafo1);
    registro_ataques_J2_CPU.appendChild(parrafo2);
};

//------------------------------------------------
window.addEventListener("load", iniciarJuego);