import { Component, OnInit } from "@angular/core";
import { Client } from "src/app/models/client";
import { Employee } from "src/app/models/employee";
import { Center } from "src/app/models/center";
import { SigningService } from "src/app/Services/signing.service";
import { Router } from '@angular/router';

@Component({
  selector: "new-clients",
  template: `
    <mat-toolbar class="bar">
      <div>
        <span>Crear {{ nav }}</span>
      </div>
      <button mat-raised-button color="primary" routerLink="/clients">
        Cancelar
      </button>
    </mat-toolbar>
    <mat-card>
      <mat-vertical-stepper [linear]="true" labelPosition="bottom">
        <mat-step
          [stepControl]="Client.clientform"
          label="Cliente"
          state="business_center"
        >
          <app-client-form #Client> </app-client-form>
          <div class="center">
            <button
              mat-button
              matStepperNext
              (click)="log(Client)"
              [disabled]="Client.clientform.invalid"
            >
              Siguiente
            </button>
          </div>
        </mat-step>

        <mat-step
          [stepControl]="Center.centerform"
          label="Centro"
          state="business"
          errorMessage="Faltan datos"
        >
          <app-center-form #Center [client]="client?.codigoCliente">
          </app-center-form>
          <div class="center">
            <button
              (click)="this.nav = 'Cliente'"
              mat-button
              matStepperPrevious
            >
              Volver
            </button>
            <button
              mat-button
              matStepperNext
              (click)="log(Center)"
              [disabled]="Center.centerform.invalid"
            >
              Siguiente
            </button>
          </div>
        </mat-step>

        <mat-step
          [stepControl]="Employee.employeeform"
          label="Empleado"
          state="people"
          errorMessage="Faltan datos"
        >
          <app-employee-form [admin]="true" #Employee> </app-employee-form>

          <div class="center">
            <button (click)="this.nav = 'Centro'" mat-button matStepperPrevious>
              Volver
            </button>
            <button
              mat-button
              (click)="log(Employee)"
              [disabled]="Employee.employeeform.invalid"
            >
              Finalizar
            </button>
          </div>
        </mat-step>
      </mat-vertical-stepper>
    </mat-card>
  `,
  styles: [
    `
      @media (max-width: 900px) {
        .center {
          display: flex;
          justify-content: center;
          margin: 10px;
        }
      }
      @media (min-width: 900px) {
        .center {
          display: flex;
          justify-content: flex-end;
          margin: 10px;
        }
      }
      mat-card {
        margin: 20px 16px;
      }
      .bar {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class ClientsComponent {
  client: Client;
  employee: Employee;
  center: Center;
  nav: string = "Cliente";
    constructor(private service: SigningService, public router: Router) {}

  log(evt) {
    if (evt.clientform != undefined) {
      this.client = evt.clientform.value;
      this.nav = "Centro";
      console.log(evt.clientform.value);
    } else if (evt.centerform != undefined) {
      this.center = evt.centerform.value;
      this.nav = "Administrador";
    } else if (evt.employeeform != undefined) {
        this.employee = evt.employeeform.value;
        this.employee.estado = "A";
        this.center.estado = "A";
        this.employee.idCentro = this.center.idCentro;
        this.center.codCliente = this.client.idCliente;
        this.client.estado = "A";
      this.service.postClients(this.client).then((x: Client) => {
        this.center.codCliente = x.idCliente;
        this.service.postCenters(this.center).then((y: Center) => {
          this.employee.idCentro = y.idCentro;
            this.service.postEmployeesAdmin(this.employee);
        }).then(x => this.router.navigate(["/clients"]))
      });
    }
  }
}
