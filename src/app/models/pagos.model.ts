
export class pagosModel{
   idMedioDePago!: number; 
   valorPagado!: number; 
   nombre?: string; 
} 
    export class DocpagosModel{
    id ?:number ; 
    idDocumento!: number; 
    nombreMedio ?:string ; 
    idMedioDePago!: number; 
    valorPagado!: number; 
    valorTotalAPagar!: number; 
    valorRecibido!: number; 
    vueltos!: number; 
    referencia!: string; }