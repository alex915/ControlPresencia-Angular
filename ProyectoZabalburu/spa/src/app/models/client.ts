import { Center } from './center';

export interface Client {
    idCliente:number;
    codigoCliente:string;
    descripcion:string;
    usuarioCreacion:number;
    fechaCreacion:Date;
    usuarioModificacion:number;
    fechaModificacion:Date;
    estado:string;
    centros?:Center[];
}

