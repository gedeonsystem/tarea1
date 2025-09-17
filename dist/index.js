"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3030;
const fechaactual = new Date();
let eventos = [];
for (let i = 1; i <= 100; i++) {
    eventos.push({
        id: i.toString(),
        nombre: `Evento ${i}`,
        descripcion: `Descripcion del evento ${i}`,
        monto: i * 10,
        fecha: 11111111,
        tipo: i % 2 === 0 ? "ingreso" : "gasto",
    });
}
//Paginacion
app.get("/api/eventos/query", (0, express_validator_1.query)("pagina").notEmpty(), (0, express_validator_1.query)("paso").notEmpty(), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            code: "PF",
            message: "pagina y paso es requerido",
            errors: errors.array(),
        });
    }
    console.log("Log: [Metodo: GET] , [url:/api/eventos/query] hoRA", fechaactual.getHours(), "query:", req.query);
    const paginaactual = Number(req.query.pagina);
    const paso = Number(req.query.paso);
    const inicio = (paginaactual - 1) * paso;
    const fin = inicio + paso;
    res.json({
        code: "OK",
        mensage: "Eventos disponibles!",
        data: {
            pagina: paginaactual,
            paso: paso,
            Eventos: eventos.slice(inicio, fin),
        },
    });
});
app.post("/api/eventos", (req, res) => {
    console.log("Log: [Metodo: POST] , [url:/api/eventos] hora", fechaactual.getHours(), "query:", req.query);
    const { id, nombre, descripcion, monto, fecha, tipo } = req.body;
    const nuevoEvento = { id, nombre, descripcion, monto, fecha, tipo };
    eventos.push(nuevoEvento);
    res.status(201).json({ code: "OK", message: "Evento Creado" });
});
app.get("/api/eventos/query", (0, express_validator_1.query)("id").notEmpty(), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            code: "PF",
            message: "Evento Id es requerido",
            errors: errors.array(),
        });
    }
    console.log("Log: [Metodo: GET] , [url:/api/eventos/query] hora", fechaactual.getHours(), "query:", req.query);
    const id = req.query.id;
    const evento = eventos.find((evento) => evento.id == id);
    if (!evento) {
        return res
            .status(404)
            .json({ code: "NF", message: "Evento no encontrado" });
    }
    res.json({
        code: "OK",
        message: "Evento No Disponible!",
        data: { evento },
    });
});
app.put("/api/eventos:id", (req, res) => {
    console.log("Log: [Metodo: PUT] , [url:/api/eventos:id] hora", fechaactual.getHours(), "params:", req.params);
    const id = req.params.id;
    const evento = eventos.find((evento) => evento.id == id);
    if (evento) {
        const { id, nombre, descripcion, monto, fecha, tipo } = req.body;
        evento.id = id;
        evento.nombre = nombre;
        evento.descripcion = descripcion;
        evento.monto = monto;
        evento.fecha = fecha;
        evento.tipo = tipo;
        res
            .status(200)
            .json({ code: "OK", message: "Evento Actualizado!", data: { evento } });
        return;
    }
    /** Evento No Encontrado  */
    res.status(404).json({ code: "NF", message: "Evento no Encontrado!" });
});
app.delete("/api/eventos:id", (req, res) => {
    console.log("Log: [Metodo: DELETE] , [url:/api/eventos:id] hora", fechaactual.getHours(), "params:", req.params);
    const id = req.params.id;
    console.log("DELETE /eventos/:id:", id);
    const evento = eventos.find((evento) => evento.id == id);
    if (evento) {
        eventos = eventos.filter((evento) => evento.id != id);
        return res.status(200).json({
            code: "OK",
            message: "Evento Eliminado!",
            data: { evento },
        });
    }
    res.status(404).json({ code: "PF", message: "Evento No Encontrado!" });
});
app.listen(port, () => {
    console.log(`Servidor Iniciado en http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map