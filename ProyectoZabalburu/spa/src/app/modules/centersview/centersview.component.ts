import { Component, OnInit } from "@angular/core";
import { SigningService } from "src/app/Services/signing.service";
import { Signing } from "src/app/models/signing";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { Center } from '../../models/center';

@Component({
  selector: "app-centersview",
  template: `
    <mat-toolbar class="bar">
      <div>
        <span>{{ this.service.client?.descripcion }}</span>
      </div>
      <button mat-raised-button color="primary" routerLink="/centers/new">
        Crear Centro
      </button>
    </mat-toolbar>
    <div class="phone">
      <mat-card *ngFor="let center of this.service.client?.centros">
        <div class="card-header">
          <h2 class="bar">
            {{ center.codigoCtrTrabajo }}
<div>
<button mat-icon-button
                    color="basic" (click)="openDialog(center.idCentro, 'edit')">
                    <mat-icon>edit</mat-icon>
                  </button>
<button mat-icon-button
                    color="basic" (click)="openDialog(center.idCentro, 'delete')">
                    <mat-icon>delete</mat-icon>
                  </button>
        

                
            <a
              color="accent"
              mat-button
              [routerLink]="['/allsignings', center.idCentro]"
              >Ver Fichajes</a
            >
</div>
          </h2>

          {{ center.poblacion }}
          ({{ center.cp }})
        </div>
        <mat-accordion>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>
                Dispositivos
              </mat-panel-title>
            </mat-expansion-panel-header>

            <app-table-devices
              [devices]="center.dispositivos"
            ></app-table-devices>
          </mat-expansion-panel>

          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>
                Empleados
              </mat-panel-title>
            </mat-expansion-panel-header>
            <app-table-employees
              [employees]="center.empleados"
            ></app-table-employees>
          </mat-expansion-panel>
        </mat-accordion>
      </mat-card>
    </div>
    <div class="pc">
      <mat-card
        class="tabpc"
        *ngFor="let center of this.service.client?.centros"
      >
        <mat-card-title class="bar">
          {{ center.codigoCtrTrabajo }}
<div>
<button mat-icon-button
                    color="basic" (click)="openDialog(center.idCentro, 'edit')">
                    <mat-icon>edit</mat-icon>
                  </button>
<button mat-icon-button
                    color="basic" (click)="openDialog(center.idCentro, 'delete')">
                    <mat-icon>delete</mat-icon>
                  </button>
          <button mat-button [routerLink]="['/allsignings', center.idCentro]">
            Ver Fichajes
          </button>
</div>
        </mat-card-title>
        <mat-card-subtitle>
          <div>
            <span> {{ center.poblacion }} ({{ center.cp }}) </span>
          </div>
        </mat-card-subtitle>
        <mat-tab-group color="accent" mat-align-tabs="end">
          <!-- <mat-tab label="Informacion">
          <div class="columns mt-4 mb-2">
            <div>Centro de Trabajo: {{ center.codigoCtrTrabajo }}</div>
            <div>Poblacion: {{ center.poblacion }}</div>
            <div>CP: {{ center.cp }}</div>
          </div>
        </mat-tab> -->
          <mat-tab label="Dispositivos">
            <app-table-devices
              [devices]="center.dispositivos"
            ></app-table-devices>
          </mat-tab>
          <mat-tab label="Empleados">
            <app-table-employees *ngIf="center.empleados.length>0"
              [employees]="center.empleados"
            ></app-table-employees>
<div *ngIf="center.empleados.length == 0">
<mat-card id="message"><mat-icon style="margin-right:25px">info</mat-icon> <span> No hay datos que mostrar </span></mat-card>
</div>

          </mat-tab>
        </mat-tab-group>
      </mat-card>
    </div>

<app-btn-fichar></app-btn-fichar>
  `,
  styles: [
    `
#message{
    background-color:rgba(255,0,0,0.2);
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    display:flex;
    align-items:center;
    padding:20px
}
      @media (max-width: 700px) {
        .phone {
          display: block;
        }

        .pc {
          display: none;
        }
      }
      @media (min-width: 701px) {
        .phone {
          display: none;
        }

        .pc {
          display: block;
        }
      }

      .mat-expansion-panel-try {
        padding: 0px;
      }

      .card-header {
        padding: 15px 24px;
      }

      mat-card {
        padding: 0;

        margin: 25px 16px;
      }

      .tabpc {
        padding: 20px 20px;
      }

      .bar a {
        padding: 0px;
      }

      .bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .columns {
        display: flex;
      }
      
      .mat-expansion-panel {
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
      }
    `,
  ],
})
export class CentersviewComponent implements OnInit {
  visible: boolean = false;

  data: Signing[];

  constructor(public service: SigningService, public dialog: MatDialog) {}

    ngOnInit(): void { }
    openDialog(data, action) {
        //let e: Employee;
     
        this.service.getCenter(data).then(x => {
            const dialogRef = this.dialog.open(PopUpComponent);
            dialogRef.componentInstance.center = x;
            dialogRef.componentInstance.action = action;
        });
        //this.service
        //    .getEmployee(data)
        //    .then((x) => (e = x))
        //    .then((y) => {
        //        const dialogRef = this.dialog.open(PopUpComponent);
        //        dialogRef.componentInstance.employee = e;
        //        dialogRef.componentInstance.action = action;
        //    });
    }
}
