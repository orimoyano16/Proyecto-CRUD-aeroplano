"use strict";
class Turbina {
    constructor(n) {
        this.numTurbinas = 0;
        this.numTurbinas = n;
    }
    ToString() {
        return this.numTurbinas + " Turbina/s";
    }
}
class Helice {
    constructor(n) {
        this.numHelices = 0;
        this.numHelices = n;
    }
    ToString() {
        return this.numHelices + " hélice/s";
    }
}
class TrendeAterrizaje {
    constructor(a, b, c) {
        this.numNeumaticos = 0;
        this.numAmortiguadores = 0;
        this.fijoRetractil = false;
        this.numNeumaticos = a;
        this.numAmortiguadores = b;
        this.fijoRetractil = c;
    }
    ToString() {
        let mensaje = "Tren de Aterrizaje compuesto por: ";
        if (this.fijoRetractil) {
            mensaje += " con Retractil fijo, ";
        }
        mensaje += this.numNeumaticos + " neumáticos, " + this.numAmortiguadores + " amoriguadores ";
        return mensaje;
    }
}
class Cubierta {
    constructor(pCabinaTripulacion, pCabinaVuelo, pSistemaEmergencia, pTanquesCombustible, pPuertasSalida) {
        this.cabinaTripulacion = false;
        this.cabinaVuelo = false;
        this.sistemaEmergencia = false;
        this.numTanquesCombustible = 0;
        this.numPuertasSalidas = 0;
        this.cabinaTripulacion = pCabinaTripulacion;
        this.cabinaVuelo = pCabinaVuelo;
        this.sistemaEmergencia = pSistemaEmergencia;
        this.numTanquesCombustible = pTanquesCombustible;
        this.numPuertasSalidas = pPuertasSalida;
    }
    ToString() {
        let mensaje = "Cubierta compuesta de: ";
        if (this.cabinaVuelo) {
            mensaje += " Cubierta de Vuelo, ";
        }
        if (this.cabinaTripulacion) {
            mensaje += " Cubierta de Tripulación, ";
        }
        if (this.sistemaEmergencia) {
            mensaje += " Sistema de Emergencia, ";
        }
        mensaje += this.numTanquesCombustible + " Tanques de Combustible, ";
        mensaje += this.numPuertasSalidas + " Puertas de Salida.";
        return mensaje;
    }
}
class Alas {
    constructor(mAlasFrente, nAlasCola) {
        this.numAlasFrente = 0;
        this.numAlasCola = 0;
        this.numAlasFrente = mAlasFrente;
        this.numAlasCola = nAlasCola;
    }
    ToString() {
        return "Alas Frontales: " + this.numAlasFrente + " Alas Posteriore: " + this.numAlasCola;
    }
}
// Clase independiente
class Piloto {
    constructor(nombre) {
        this.nombre = nombre;
    }
    ToString() {
        return "El piloto se llama: " + this.nombre;
    }
}
class Aeroplano {
    constructor(phelice, pTrenAterrizaje, pAlas, pCubierta) {
        this.helice = phelice;
        this.trenAterrizaje = pTrenAterrizaje;
        this.alas = pAlas;
        this.cubierta = pCubierta;
    }
    agregarPiloto(p) {
        this.piloto = p;
    }
    ToString() {
        let mensaje = "Aeroplano compuesto por: ";
        mensaje += this.helice.ToString();
        mensaje += this.alas.ToString();
        mensaje += this.trenAterrizaje.ToString();
        mensaje += this.cubierta.ToString();
        //Si hay piloto
        if (this.piloto) {
            mensaje += this.piloto.ToString();
        }
        return mensaje;
    }
}
let helice = new Helice(3);
let trenAterrizaje = new TrendeAterrizaje(2, 3, true);
let alas = new Alas(2, 3);
let cubierta = new Cubierta(true, true, true, 4, 4);
let piloto = new Piloto("Pedro");
let aeroplano = new Aeroplano(helice, trenAterrizaje, alas, cubierta);
// Agregación
aeroplano.agregarPiloto(piloto);
console.log(aeroplano.ToString());
