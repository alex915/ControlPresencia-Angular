import { Component, OnInit, NgZone } from "@angular/core";
import { Employee } from "src/app/models/employee";
import { SigningService } from "src/app/Services/signing.service";
import { Router } from '@angular/router';

@Component({
  selector: "new-employees",
  template: `
    <mat-toolbar class="bar">
      <div>
        <span>Crear Empleado</span>
      </div>
      <button mat-raised-button color="primary"  (click)="reload()">
        Volver
      </button>
    </mat-toolbar>
    <mat-card>
      <app-employee-form #Employee> </app-employee-form>
      <div class="center">
        <button [disabled]="Employee.employeeform.invalid" mat-button (click)="log(Employee)">Finalizar</button>
      </div>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        margin: 20px 16px;
      }

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

      .bar {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class EmployeesComponent implements OnInit {
  employee: Employee;
    constructor(private service: SigningService,public router: Router) {}

  ngOnInit(): void {}

  log(evt) {
      if (evt.employeeform != undefined) {
          this.employee = evt.employeeform.value;
          console.log(this.employee.idCentro);
          this.service.getCenter(this.employee.idCentro).then(x => {
              this.employee.centro = x;
              this.employee.estado = "A";
              console.log(this.employee.centro.empleados);
          }).then(p => this.service.postEmployees(this.employee).then(x => { this.router.navigateByUrl("/employees").then(x => window.location.reload()); }));

       // this.employee.centro.empleados.unshift(this.employee);
    }
    }

    reload() {
        this.router.navigateByUrl("/employees");
    }
}
