import { Center } from './center';
import { Signing } from './signing';

export interface Employee {
    empleadoId:number;
    nombre:string;
    primerApellido:string;
    segundoApellido:string;
    dni:string;
    fechaNacimiento:Date;
    direccion:string;
    numeroVia:string;
    provincia:string;
    municipio:string;
    cp:string;
    telefono:string;
    email:string;
    fechaAlta:Date;
    oid:string;
    centro?:Center;
    estado:string;
    fichajes: Signing[];
    idCentro: number;
    }