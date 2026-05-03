import express, { Request, Response } from "express";
import cors from "cors";
import * as aeroplano from "./aeroplano";

const app = express();
const PORT: number = 3000;

// CRUD EN MEMORIA
const BD_AEROPLANOS: { id: number; aeroplano: aeroplano.Aeroplano }[] = [];
let idCounter = 0;

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:4200"
  })
);

// Middleware para JSON
app.use(express.json());

// Endpoint GET
app.get("/api/saludo", (req: Request, res: Response) => {
  res.json({
    mensaje: "Hola desde el backend. Conexion exitosa."
  });
});

// Endpoint POST (agregar un aeroplano)
app.post("/api/aeroplanos/crearAeroplano",
  (req: Request, res: Response) => {

    const {
      //Aeroplano
      marca, modelo, año,
      //Alas
      cantAlasFrente, cantAlasCola,
      //Tren de aterrizaje
      numNeumaticos, numAmortiguadores, fijoRetractil,
      //Cubierta
      cabinaTripulacion, cabinaVuelo, sistemaEmergencia, numTanquesCombustible, numPuertasSalidas,
      //Helice
      numHelices,
      //Turbina
      numTurbinas
    } = req.body;

    const alas = new aeroplano.Alas(cantAlasFrente, cantAlasCola);
    const trenAterrizaje = new aeroplano.TrendeAterrizaje(numNeumaticos, numAmortiguadores, fijoRetractil);
    const cubierta = new aeroplano.Cubierta(cabinaTripulacion, cabinaVuelo, sistemaEmergencia, numTanquesCombustible, numPuertasSalidas);
    const helices = new aeroplano.Helice(numHelices);
    const turbinas = new aeroplano.Turbina(numTurbinas);

    const aero = new aeroplano.Aeroplano(marca, modelo, año, helices, trenAterrizaje, alas, cubierta, turbinas);

    BD_AEROPLANOS.push({ id: idCounter, aeroplano: aero });
    idCounter++;

    res.status(201).json({
      mensaje: aero.ToString(),
    });
  }
);

//Obtener lista de los aerolplanos
app.get("/api/aeroplanos/obtenerAeroplanos",
  (req: Request, res: Response) => {
    res.status(200).json({
      aeroplanos: BD_AEROPLANOS.toString()
    });
  }
);

//Eliminamos el aeroplano seleccionado
app.delete("/api/aeroplanos/eliminarAeroplano/:ID",
  (req: Request, res: Response) => {
    const ID = parseInt(req.params.ID as string);
    const index = BD_AEROPLANOS.findIndex(aeroplano => aeroplano.id === ID);

    if (index !== -1) {

      BD_AEROPLANOS.splice(index, 1);

      res.status(200).json({
        mensaje: "Aeroplano eliminado correctamente."
      });
    } else {
      res.status(400).json({
        mensaje: "No se encontro el aeroplano con el ID " + ID
      })
    }
  }
);

app.put("/api/aeroplanos/actualizarAeroplano/:ID",
  (req: Request, res: Response) => {
    const ID = parseInt(req.params.ID as string);
    const aeroplano_selected = BD_AEROPLANOS.find(aeroplano => aeroplano.id === ID);

    if (aeroplano_selected != undefined) {
      const {
        //Aeroplano
        marca, modelo, año,
        //Alas
        cantAlasFrente, cantAlasCola,
        //Tren de aterrizaje
        numNeumaticos, numAmortiguadores, fijoRetractil,
        //Cubierta
        cabinaTripulacion, cabinaVuelo, sistemaEmergencia, numTanquesCombustible, numPuertasSalidas,
        //Helice
        numHelices,
        //Turbina
        numTurbinas
      } = req.body;

      const alas = new aeroplano.Alas(cantAlasFrente, cantAlasCola);
      const trenAterrizaje = new aeroplano.TrendeAterrizaje(numNeumaticos, numAmortiguadores, fijoRetractil);
      const cubierta = new aeroplano.Cubierta(cabinaTripulacion, cabinaVuelo, sistemaEmergencia, numTanquesCombustible, numPuertasSalidas);
      const helices = new aeroplano.Helice(numHelices);
      const turbinas = new aeroplano.Turbina(numTurbinas);

      aeroplano_selected.aeroplano = new aeroplano.Aeroplano(marca, modelo, año, helices, trenAterrizaje, alas, cubierta, turbinas);

      res.status(200).json({
        mensaje: "Aeroplano actualizado correctamente."
      });

    } else {
      res.status(400).json({
        mensaje: "No se encontro el aeroplano con el ID " + ID
      });
    }
  }
);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});