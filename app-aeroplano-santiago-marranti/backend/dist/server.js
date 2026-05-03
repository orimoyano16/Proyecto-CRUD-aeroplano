"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: "http://localhost:4200"
}));
// Middleware para JSON
app.use(express_1.default.json());
// Endpoint GET
app.get("/api/saludo", (req, res) => {
    res.json({
        mensaje: "Hola desde el backend. Conexion exitosa."
    });
});
// Endpoint POST (agregar motor a un aeroplano)
app.post("/api/aeroplanos/:id/motores", (req, res) => {
    const aeroplanoId = req.params.id;
    const { tipo, potencia } = req.body;
    console.log("Aeroplano:", aeroplanoId);
    console.log("Motor:", tipo, potencia);
    res.json({
        mensaje: "Motor agregado correctamente",
        aeroplanoId,
        motor: { tipo, potencia }
    });
});
// Levantar servidor
app.listen(PORT, () => {
    console.log(`Backend escuchando en http://localhost:${PORT}`);
});
