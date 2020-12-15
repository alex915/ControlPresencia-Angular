import { Center } from './center';
import { Signing } from './signing';

export interface Device {
    idDispositivo:number;
    codigo:string;
    codCentro?:number;
    descripcion:string;
    codTipoDispositivo:number;
    usuarioCreacion:number;
    fechaCreacion:Date;
    usuarioModificacion:number;
    fechaModificacion:Date;
    estado:string;
    Modem:number;
    Centro:Center;
    Fichajes:Signing[];
}
