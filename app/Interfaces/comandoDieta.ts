import { ComandoDetalleDieta } from "./comandoDetalleDieta";

export class ComandoDieta {

    idDieta?: number;
    nombreDieta: String;
    fechaCreacion: String;
    observacion: string;
    alimentos: ComandoDetalleDieta[];

}