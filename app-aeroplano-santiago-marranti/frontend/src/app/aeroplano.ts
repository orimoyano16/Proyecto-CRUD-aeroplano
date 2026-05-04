export interface AeroplanoData {
  id?: number;
  marca: string;
  modelo: string;
  anio: number;
  helice: {
    numHelices: number;
  };
  trenAterrizaje: {
    numNeumaticos: number;
    numAmortiguadores: number;
    fijoRetractil: boolean;
  };
  alas: {
    numAlasFrente: number;
    numAlasCola: number;
  };
  cubierta: {
    cabinaTripulacion: boolean;
    cabinaVuelo: boolean;
    sistemaEmergencia: boolean;
    numTanquesCombustible: number;
    numPuertasSalidas: number;
  };
  turbina: {
    numTurbinas: number;
  };
}
