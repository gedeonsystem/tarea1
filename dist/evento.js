"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoCreateSchema = exports.EventoSchema = void 0;
const zod_1 = require("zod");
exports.EventoSchema = zod_1.z.object({
    id: zod_1.z.string(),
    nombre: zod_1.z
        .string()
        .min(5, "Minimo 3 caracteres")
        .max(20, "Maximo 20 caracteres"),
    descripcion: zod_1.z
        .string()
        .min(10, "Descripcion debe tener minimo 10 caracteres")
        .max(60, "Descripcion debe tener maximo 60 caracteres"),
    monto: zod_1.z
        .number()
        .min(1, "el valor minimo es 1")
        .max(1000, "el valor maximo es 1000"),
    fecha: zod_1.z.number(),
    tipo: zod_1.z.enum(["ingreso", "gasto"]),
    adjunto: zod_1.z.string().optional(),
});
exports.EventoCreateSchema = exports.EventoSchema.omit({ id: true });
//# sourceMappingURL=evento.js.map