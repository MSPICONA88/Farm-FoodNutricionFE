export class Stock {
    idAlimento: number;
    fechaRegistro: string;
    toneladas: number;
    precioTonelada?: number;
    idTipoMovimiento?: number;
    ok?: boolean;
    error?: string;
    statusCode?: string;
}