import { Component, OnInit, Input } from "@angular/core";
import { Device } from "../../models/device";
import { MatDialogRef } from "@angular/material/dialog";
import { SigningService } from "../../Services/signing.service";
import { Employee } from "../../models/employee";
import { Center } from "../../models/center";
import { Signing } from "../../models/signing";
import { Router } from "@angular/router";
import { Client } from "../../models/client";

@Component({
  selector: "app-pop-up",
  template: `
    <div *ngIf="action === 'delete'">
      <div *ngIf="device">
        <h1 mat-dialog-title>{{ device.descripcion }}</h1>
        <div mat-dialog-content>¿Deseas eliminar el dispositivo?</div>
      </div>
      <div *ngIf="employee">
        <h1 mat-dialog-title>{{ employee.nombre }}</h1>
        <div mat-dialog-content>¿Deseas eliminar el empleado?</div>
      </div>
      <div *ngIf="client">
        <div mat-dialog-content>
          ¿Deseas eliminar el cliente {{ client.descripcion }}?
        </div>
      </div>
    <div *ngIf="center">
        <div mat-dialog-content>
          ¿Deseas eliminar el centro {{ center.poblacion }}?
        </div>
      </div>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close (click)="eliminar()">Borrar</button>
        <button mat-button mat-dialog-close>Cancelar</button>
      </mat-dialog-actions>
    </div>

    <div *ngIf="action === 'edit'">
 <div *ngIf="center">
        <div mat dialog-content style="width:800px">
          <app-center-form [client]="service.client?.codigoCliente" [center]="center" #Cent></app-center-form> 
        </div>
        <mat-dialog-actions>
          <button mat-button mat-dialog-close (click)="modificar(Cent)">Editar</button>
          <button mat-button mat-dialog-close>Cancelar</button>
        </mat-dialog-actions>
      </div>

      <div *ngIf="device">
        <h1 mat-dialog-title>Editar Dispositivo</h1>
        <div mat-dialog-content>
          <app-device [device]="device"></app-device>
        </div>
        <mat-dialog-actions>
          <button mat-button mat-dialog-close>Editar</button>
          <button mat-button mat-dialog-close>Cancelar</button>
        </mat-dialog-actions>
      </div>
      <div *ngIf="employee">
        <div mat dialog-content style="width:800px">
          <app-employee-form [employee]="employee"></app-employee-form>
        </div>
        <mat-dialog-actions>
          <button mat-button mat-dialog-close>Editar</button>
          <button mat-button mat-dialog-close>Cancelar</button>
        </mat-dialog-actions>
      </div>


      <div  *ngIf="client">
        <app-client-form [client]="client" #Cli></app-client-form>

        <mat-dialog-actions>
          <button mat-button mat-dialog-close (click)="modificar(Cli)">
            Editar
          </button>
          <button mat-button mat-dialog-close>Cancelar</button>
        </mat-dialog-actions>
      </div>
    </div>

 
  `,
  styles: [`
    
  `],
})
export class PopUpComponent implements OnInit {
  action: any;
  device: Device;
  employee: Employee;
  center: Center;
  client: Client;
  signings: Signing[] = [];
  signings2: Signing[] = [];
  dataLoaded: Promise<boolean>;
  promises: Promise<any>[] = [];

  public dialogRef: MatDialogRef<PopUpComponent>;
    constructor(public service: SigningService, private router: Router) { }


    onNoClick(): void {
        this.dialogRef.close();
    }

  ngOnInit(): void {
    if (this.center) {
     // this.getFichajes();
    }
  }

  public getFichajes() {
    this.center.dispositivos.forEach((x) =>
      this.promises.push(this.service.getDevice(x.idDispositivo))
    );
    console.log(this.promises);
    Promise.all(this.promises)
      .then((x) =>
        x.forEach((y) => {
          this.signings = this.signings.concat(y.fichajes);
        })
      )
      .then((o) => {
        this.sortt(this.signings);
        this.signings = this.signings.slice(0, 10);
        this.dataLoaded = Promise.resolve(true);
      });
  }

  public sortt(s: Signing[]) {
    s.sort((a, b) => {
      if (a.fecha < b.fecha) {
        return 1;
      }
      if (a.fecha > b.fecha) {
        return -1;
      }
      return 0;
    });
  }
  public btnClick() {
    this.router.navigateByUrl("/signings");
  }

  public modificar(evt) {

      if (this.center) {
        
          console.log(evt.centerform.value.codigoCtrTrabajo);

          this.center.codigoCtrTrabajo = evt.centerform.value.codigoCtrTrabajo;
          this.center.poblacion = evt.centerform.value.poblacion;
          this.center.cp = evt.centerform.value.cp;
          this.center.estado = "A";
          this.center.codCliente = this.service.client.idCliente;
          console.log(this.center);
          this.service.putCenters(this.center.idCentro, this.center).then(x => window.location.reload());
          this.service.getAllCenters().then(x => console.log(x));

      }

      if (this.client) {
   
          console.log(this.client);
          this.client.descripcion = evt.clientform.value.descripcion;
          this.client.codigoCliente = evt.clientform.value.codigoCliente;
          console.log(evt.clientform.value.descripcion);
          this.service.putClients(this.client.idCliente, this.client).then(x => window.location.reload());


      }
  }

  public eliminar() {
      if (this.client) {
          this.service.deleteClients(this.client.idCliente);
      }
      if (this.employee) {
          console.log(this.employee);
          this.service.deleteEmployee(this.employee.empleadoId);
          

      }

      if (this.center) {
          this.service.deleteCenters(this.center.idCentro);
      }

      window.location.reload();
    }

}
