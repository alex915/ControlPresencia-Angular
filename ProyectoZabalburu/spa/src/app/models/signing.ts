import { Device } from './device';
import { Employee } from './employee';

export interface Signing {
    id:number;
    codEmpleado:number;
    codTipoFichaje:string;
    codigoAusencia:number;
    fecha:Date;
    latitud:string;
    longitud:string;
    usuarioCreacion:number;
    fechaCreacion:Date;
    usuarioModificacion:number;
    fechaModificacion:Date;
    estado:string;
    idDispositivo:number;
    dispositivo: Device;
    empleado: Employee;
}
