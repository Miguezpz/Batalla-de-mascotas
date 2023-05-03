class Batalla_de_mascotas {
    constructor(nombre, img, id, especialidad) {
        this.nombre = nombre;
        this.img = img;
        this.id = id;
        this.especialidad = especialidad;
        this.ataques = [];
    }
}

let mascotas = [];
let peluchin = new Batalla_de_mascotas("Peluchin", "null", "peluchin_id", "piedra");
let sazu = new Batalla_de_mascotas("Sazu", "null", "sazu_id", "piedra");
let aren = new Batalla_de_mascotas("Aren", "null", "aren_id", "piedra");
let oreo = new Batalla_de_mascotas("Oreo", "null", "oreo_id", "papel");
let harry = new Batalla_de_mascotas("Harry", "null", "harry_id", "papel");
let toby = new Batalla_de_mascotas("Toby", "null", "toby_id", "papel");

// Opciones: Gato Huaniqueo, (guero, mona), kong, regalito, la negra, (bobby, dinky, wanda), hueso, kaiser,
//claudia gato; pug de arturin;