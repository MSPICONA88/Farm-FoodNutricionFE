import { Alimento } from "./alimento";

export class Dieta{
    idDieta: number;
    nombreDieta: string;
    fechaCreacion: string;
    observacion: string;
    alimentos: Alimento[];
}