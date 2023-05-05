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
let mascota_P1;
let mascota_P2;

//Mascotas
let mascotas = [];
let peluchin = new Batalla_de_mascotas("Peluchin", "null", "peluchin_id", "piedra");
let sazu = new Batalla_de_mascotas("Sazu", "null", "sazu_id", "piedra");
let aren = new Batalla_de_mascotas("Aren", "null", "aren_id", "piedra");
let oreo = new Batalla_de_mascotas("Oreo", "null", "oreo_id", "papel");
let harry = new Batalla_de_mascotas("Harry", "null", "harry_id", "papel");
let toby = new Batalla_de_mascotas("Toby", "null", "toby_id", "papel");

mascotas.push(peluchin,sazu,aren,oreo,harry,toby);

// Opciones: Gato Huaniqueo, (guero, mona), kong, regalito, la negra, (bobby, dinky, wanda), hueso, kaiser,
//claudia gato; pug de arturin;

function iniciarJuego() {
    mascotas.forEach(x => {
        let estructura = `
            <label for="${x.id}">${x.nombre}</label>
            <input type="radio" id="${x.id}" name="enlace">
        `
        let labels_mascotas = `<label for="${x.id}">${x.nombre}</label>`;
        caja_mascotas.innerHTML += estructura;
    });

    boton_seleccionar.addEventListener("click", seleccionarMascota_P1);
};

function seleccionarMascota_P1() {
    labels_mascotas.forEach(x => {

        x.addEventListener("checked", seleccion);

        function seleccion() {
            
        }
    })

    
}

//Necesito crear una variable que guarde todos los labels
//------------------------------------------------
window.addEventListener("load", iniciarJuego);