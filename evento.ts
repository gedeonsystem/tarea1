import { z } from "zod";

export const EventoSchema = z.object({
  id: z.string(),
  nombre: z
    .string()
    .min(5, "Minimo 3 caracteres")
    .max(20, "Maximo 20 caracteres"),
  descripcion: z
    .string()
    .min(10, "Descripcion debe tener minimo 10 caracteres")
    .max(60, "Descripcion debe tener maximo 60 caracteres"),
  monto: z
    .number()
    .min(1, "el valor minimo es 1")
    .max(1000, "el valor maximo es 1000"),
  fecha: z.number(),
  tipo: z.enum(["ingreso", "gasto"]),
  adjunto: z.string().optional(),
});

export type EventoType = z.infer<typeof EventoSchema>;

export const EventoCreateSchema = EventoSchema.omit({ id: true });
export type EventoCreateType = z.infer<typeof EventoCreateSchema>;
