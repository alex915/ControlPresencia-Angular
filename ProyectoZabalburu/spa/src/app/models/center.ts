import { Client } from './client';
import { Device } from './device';
import { Employee } from './employee';

export interface Center {
    idCentro:number;
    codigoCtrTrabajo:string;
    poblacion:string;
    cp:string;
    usuarioCreacion:number;
    fechaCreacion:Date;
    usuarioModificacion:number;
    fechaModificacion:Date;
    estado:string;
    idCtrTrab:number;
    codCliente?:number;
    cliente:Client,
    dispositivos:Device[],
    empleados:Employee[];
}

