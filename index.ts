import express, { Request, Response } from "express";
import { query, validationResult } from "express-validator";
import { EventoType } from "./evento";

const app = express();
app.use(express.json());
const port = 3030;
const fechaactual = new Date();

let eventos: EventoType[] = [];

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
app.get(
  "/api/eventos/query",
  query("pagina").notEmpty(),
  query("paso").notEmpty(),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        code: "PF",
        message: "pagina y paso es requerido",
        errors: errors.array(),
      });
    }
    console.log(
      "Log: [Metodo: GET] , [url:/api/eventos/query] hora",
      fechaactual.getHours(),
      "query:",
      req.query
    );
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
  }
);

app.post("/api/eventos", (req, res) => {
  console.log(
    "Log: [Metodo: POST] , [url:/api/eventos] hora",
    fechaactual.getHours(),
    "query:",
    req.query
  );
  const { id, nombre, descripcion, monto, fecha, tipo } = req.body;
  const nuevoEvento = { id, nombre, descripcion, monto, fecha, tipo };
  eventos.push(nuevoEvento);
  res.status(201).json({ code: "OK", message: "Evento Creado" });
});

app.get(
  "/api/eventos/query",
  query("id").notEmpty(),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        code: "PF",
        message: "Evento Id es requerido",
        errors: errors.array(),
      });
    }

    console.log(
      "Log: [Metodo: GET] , [url:/api/eventos/query] hora",
      fechaactual.getHours(),
      "query:",
      req.query
    );
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
  }
);

app.put("/api/eventos:id", (req: Request, res: Response) => {
  console.log(
    "Log: [Metodo: PUT] , [url:/api/eventos:id] hora",
    fechaactual.getHours(),
    "params:",
    req.params
  );
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

app.delete("/api/eventos:id", (req: Request, res: Response) => {
  console.log(
    "Log: [Metodo: DELETE] , [url:/api/eventos:id] hora",
    fechaactual.getHours(),
    "params:",
    req.params
  );
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
