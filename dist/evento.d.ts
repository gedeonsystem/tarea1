import { z } from "zod";
export declare const EventoSchema: z.ZodObject<{
    id: z.ZodString;
    nombre: z.ZodString;
    descripcion: z.ZodString;
    monto: z.ZodNumber;
    fecha: z.ZodNumber;
    tipo: z.ZodEnum<{
        ingreso: "ingreso";
        gasto: "gasto";
    }>;
    adjunto: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type EventoType = z.infer<typeof EventoSchema>;
export declare const EventoCreateSchema: z.ZodObject<{
    nombre: z.ZodString;
    descripcion: z.ZodString;
    monto: z.ZodNumber;
    fecha: z.ZodNumber;
    tipo: z.ZodEnum<{
        ingreso: "ingreso";
        gasto: "gasto";
    }>;
    adjunto: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type EventoCreateType = z.infer<typeof EventoCreateSchema>;
//# sourceMappingURL=evento.d.ts.map