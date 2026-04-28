import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // Necesario para leer datos en los POST/PUT

// --- CLASES DEL DOMINIO ---

class Turbina {
    private numTurbinas: number;
    public constructor(n: number) { this.numTurbinas = n; }
    public ToString() { return this.numTurbinas + " Turbina/s"; }
    public setNumTurbinas(n: number) { this.numTurbinas = n; }
}

class Helice {
    private numHelices: number;
    public constructor(n: number) { this.numHelices = n; }
    public ToString() { return this.numHelices + " Hélice/s"; }
    public setNumHelices(n: number) { this.numHelices = n; }
}

class TrendeAterrizaje {
    private numNeumaticos: number;
    private numAmortiguadores: number;
    private fijoRetractil: boolean;
    public constructor(a: number, b: number, c: boolean) {
        this.numNeumaticos = a;
        this.numAmortiguadores = b;
        this.fijoRetractil = c;
    }
    public ToString() { return `Tren: ${this.numNeumaticos} neumáticos, ${this.numAmortiguadores} amortiguadores`; }
}

class Cubierta {
    private numTanquesCombustible: number;
    public constructor(pTanquesCombustible: number) {
        this.numTanquesCombustible = pTanquesCombustible;
    }
    public ToString() { return `Cubierta con ${this.numTanquesCombustible} Tanques`; }
}

class Alas {
    private numAlasFrente: number;
    public constructor(mAlasFrente: number) {
        this.numAlasFrente = mAlasFrente;
    }
    public ToString() { return `Alas Frontales: ${this.numAlasFrente}`; }
}

class Aeroplano {
    public id: number;
    private modelo: string;
    
    // Agregación: Se inyectan desde afuera
    private turbina: Turbina;
    private helice: Helice;
    private trenAterrizaje: TrendeAterrizaje;
    
    // Composición: Se instancian por el Aeroplano
    private alas: Alas;
    private cubierta: Cubierta;

    // Fíjate cómo el constructor recibe los OBJETOS de agregación, pero solo los DATOS para la composición
    constructor(id: number, modelo: string, pturbina: Turbina, phelice: Helice, pTren: TrendeAterrizaje, alasFrente: number, tanques: number) {
        this.id = id;
        this.modelo = modelo;
        
        // AGREGACIÓN
        this.turbina = pturbina;
        this.helice = phelice;
        this.trenAterrizaje = pTren;
        
        // COMPOSICIÓN (nacen aquí adentro)
        this.alas = new Alas(alasFrente);
        this.cubierta = new Cubierta(tanques);
    }

    public actualizarPiezasExteriores(numTurbinas: number, numHelices: number) {
        this.turbina.setNumTurbinas(numTurbinas);
        this.helice.setNumHelices(numHelices);
    }

    public obtenerInfo() {
        return {
            id: this.id,
            modelo: this.modelo,
            descripcion: `${this.modelo} | ${this.turbina.ToString()} | ${this.helice.ToString()} | ${this.alas.ToString()} | ${this.cubierta.ToString()}`
        };
    }
}

// --- BASE DE DATOS SIMULADA ---
let inventario: Aeroplano[] = [];
let contadorId = 1;

// --- RUTAS CRUD ---

// C (CREATE) - Crear un Aeroplano
app.post('/api/aeroplanos', (req: Request, res: Response) => {
    const { modelo, turbinas, helices, alas, tanques } = req.body;
    
    // Instanciamos las partes de Agregación de forma independiente
    const turbinaInstancia = new Turbina(turbinas || 2);
    const heliceInstancia = new Helice(helices || 2);
    const trenInstancia = new TrendeAterrizaje(4, 2, true);

    // Creamos el Aeroplano (Las partes de Composición se crearán solas por dentro)
    const nuevoAvion = new Aeroplano(contadorId++, modelo || "Avion Genérico", turbinaInstancia, heliceInstancia, trenInstancia, alas || 2, tanques || 4);
    
    inventario.push(nuevoAvion);
    res.status(201).json({ success: true, message: "Aeroplano creado", data: nuevoAvion.obtenerInfo() });
});

// R (READ) - Leer todos
app.get('/api/aeroplanos', (req: Request, res: Response) => {
    const datos = inventario.map(a => a.obtenerInfo());
    res.json(datos);
});

// U (UPDATE) - Actualizar piezas de agregación
app.put('/api/aeroplanos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { turbinas, helices } = req.body;
    
    const avion = inventario.find(a => a.id === id);
    if (!avion) return res.status(404).json({ error: "Aeroplano no encontrado" });

    avion.actualizarPiezasExteriores(turbinas, helices);
    res.json({ success: true, message: "Aeroplano actualizado", data: avion.obtenerInfo() });
});

// D (DELETE) - Borrar un Aeroplano
app.delete('/api/aeroplanos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    inventario = inventario.filter(a => a.id !== id);
    res.json({ success: true, message: "Aeroplano desguazado" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend CRUD corriendo en http://localhost:${PORT}`));