import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { SigningService } from "../../Services/signing.service";
import { Employee } from "../../models/employee";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from "../../components/pop-up/pop-up.component";
import { EmployeeComponent } from "../../components/forms/employee/employee.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-employees-view",
  template: `
    <mat-toolbar class="bar">
      <div>
        <span>Empleados</span>
      </div>
      <button mat-raised-button color="primary" routerLink="/employees/new">
        Crear Empleado
      </button>
    </mat-toolbar>

    <div id="container">
      <div id="left">
        <div id="search">
          <mat-form-field class="example-form-field" color="accent">
            <mat-label>Buscar Empleados</mat-label>
            <input
              matInput
              type="text"
              (keyup)="search(searchText)"
              [(ngModel)]="searchText"
            />
            <button
              mat-button
              *ngIf="searchText"
              matSuffix
              mat-icon-button
              aria-label="Clear"
              (click)="reset()"
            >
              <mat-icon>close</mat-icon>
            </button>
          </mat-form-field>

          <mat-form-field class="centerSelect" color="accent">
            <mat-label>Centros</mat-label>
            <mat-select [formControl]="centersControl">
              <mat-option (click)="getEmployees()"
                >Todos los centros
              </mat-option>
              <mat-option
                *ngFor="let group of this.service.client?.centros"
                [value]="group.idCentro"
                (click)="filterCenter(group.idCentro)"
              >
                {{ group.poblacion }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div *ngFor="let letter of letters2" class="letterGroup">
          <h2 [id]="letter" class="l">{{ letter }}</h2>
          <mat-accordion *ngFor="let employee of filterByLetter(letter)">
            <mat-expansion-panel hideToggle>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  {{ employee.nombre }} {{ employee.primerApellido }}
                  {{ employee.segundoApellido }}
                </mat-panel-title>
                <mat-panel-description>
                  {{ employee.email }} | {{ employee.telefono }}
                </mat-panel-description>
              </mat-expansion-panel-header>

              <div>
                <app-employee-form
                  #child
                  [employee]="employee"
                  [readonly]="readonly"
                  edit="true"
                ></app-employee-form>
              </div>
              <div class="btn1" [id]="employee.empleadoId + 'btn'">
                <div class="flexicon">
                  <button
                    mat-icon-button
                    color="basic"
                    (click)="openDialog(employee.empleadoId, 'delete')"
                  >
                    <mat-icon>delete</mat-icon>
                  </button>
                  <button
                    mat-icon-button
                    color="basic"
                    (click)="edit(employee.empleadoId)"
                  >
                    <mat-icon>edit</mat-icon>
                  </button>
                </div>
              </div>
              <div [id]="employee.empleadoId" class="btn2">
                <div class="flexi">
                  <button
                    mat-raised-button
                    color="primary"
                    (click)="ccEdit(employee.empleadoId, 'cancel')"
                  >
                    Cancelar
                  </button>
                  <button
                    mat-raised-button
                    color="primary"
                    (click)="ccEdit(employee.empleadoId, 'confirm'); save()"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </mat-expansion-panel>
          </mat-accordion>
        </div>
      </div>

      <mat-list id="right" (onscroll)="scrollevt()">
        <mat-list-item *ngFor="let letter of letters">
          <a
            matLine
            *ngIf="letters2.indexOf(letter) >= 0"
            (click)="goTo(letter)"
            [id]="letter + 'a'"
            class="ls"
            >{{ letter }}</a
          >
          <p
            matLine
            *ngIf="letters2.indexOf(letter) < 0"
            [id]="letter + 'a'"
            class="ls dis"
          >
            {{ letter }}
          </p>
        </mat-list-item>
      </mat-list>
    </div>
<app-btn-fichar></app-btn-fichar>
  `,
  styles: [
    `
      .letterGroup {
        margin-bottom: 30px;
      }

      .flexi {
        display: flex;
        justify-content: space-evenly;
        width: 50%;
        margin: 10px;
      }

      @keyframes example {
        from {
          color: #ffd740;
        }
        to {
          color: white;
        }
      }

      mat-panel-title {
        width: 50%;
        margin: 0px;
        padding: 0px;
      }

      mat-panel-description {
        width: 50%;
        margin: 0px;
        padding: 0px;
      }

      .flexicon {
        margin: 10px;
        display: flex;
        justify-content: flex-end;
      }

      .dis {
        color: grey;
      }

      .bar {
        display: flex;
        justify-content: space-between;
      }

      .btn2 {
        display: none;
        justify-content: center;
      }

      input {
        width: 200px;
      }

      .lab {
        width: 500px;
        min-width: 105px;
      }

      mat-accordion {
        margin-bottom: 10px;
      }

      #search {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      .example-form-field {
        flex-basis: 70%;
        margin-right: 25px;
        flex-grow: 1;
      }

      .centerSelect {
        flex-basis: 25%;
        flex-grow: 1;
      }

      @media (max-width: 770px) {
        .example-form-field {
          margin-right: 0px;
        }
      }

      #container {
        display: block;
        margin: 25px 16px;
      }

      #right {
        margin-right: 8px;
        position: absolute;
        top: 270px;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.15);
        display: inline-flex;
        right: 0px;
        border-radius: 15px;
        width: 30px;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
      }

      @supports (
        (-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px))
      ) {
        #right {
          background-color: rgba(255, 255, 255, 0.05);
          -webkit-backdrop-filter: blur(5px);
          backdrop-filter: blur(5px);
        }
      }

      #right > mat-list-item {
        height: calc(100vh / 27);
        width: auto;
      }

      #right > mat-list-item a:hover {
        cursor: pointer;
        font-weight: bold;
      }

      #left > mat-list-item {
        margin-top: 50px;
        margin-bottom: 50px;
      }

      #left {
        width: 100%;
        padding: 0px 50px;
      }

      @media (max-width: 900px) {
        mat-panel-description {
          display: none;
        }

        #left {
          padding: 0px;
        }

        .flexi {
          width: 80% !important;
          margin: 10px;
        }
      }
      mat-expansion-panel {
        margin: 10px 0px;
      }
    `,
  ],
})
export class EmployeesViewComponent implements OnInit {
  employees: Employee[];
  employeesAll: Employee[] = [];
  letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  letters2;
  centersControl = new FormControl();
  readonly: Boolean = true;
  @ViewChildren("child") components: QueryList<EmployeeComponent>;
  public searchText: string = "";

  constructor(
    public dialog: MatDialog,
    public service: SigningService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.chargeLetters();
    window.onscroll = function () {
      let right = document.getElementById("right");

      if (window.scrollY > 270) {
        right.style.position = "fixed";
        right.style.top = "0";
      } else {
        right.style.position = "absolute";
        right.style.top = "270px";
      }
    };
  }

  scrollevt() {
    let right = document.getElementById("right");
    alert("hola");
    if (window.scrollY > 270) {
      right.style.position = "fixed";
      right.style.top = "0";
    } else {
      right.style.position = "sticky";

      right.style.top = "270px";
    }
  }
  public edit(id) {
    this.components.forEach((x) => {
      if (id === x.employee.empleadoId) {
        x.readonly = false;
        x.employeeform.controls.nombre.enable();
        x.employeeform.controls.primerapellido.enable();
        x.employeeform.controls.segundoapellido.enable();
        x.employeeform.controls.direccion.enable();
        x.employeeform.controls.numero.enable();
        x.employeeform.controls.municipio.enable();
        x.employeeform.controls.provincia.enable();
        x.employeeform.controls.cp.enable();
        x.employeeform.controls.telefono.enable();
        x.employeeform.controls.email.enable();
      }
    });

    document.getElementById(id + "btn").style.display = "none";
    document.getElementById(id).style.display = "flex";
  }

  public ccEdit(id, action) {
    this.components.forEach((x) => {
      if (id === x.employee.empleadoId) {
        x.readonly = true;
        let employee = x.employeeform.value;
        //console.log(employee);
      }
    });

    if (action === "confirm") {
      this.components.forEach((x) => {
        if (id === x.employee.empleadoId) {
          let employee;
          this.service
            .getEmployee(id)
            .then((y) => (employee = y))
            .then((y) => {
              employee.nombre = x.employeeform.value.nombre;
              employee.primerApellido = x.employeeform.value.primerapellido;
              employee.segundoApellido = x.employeeform.value.segundoapellido;
              employee.direccion = x.employeeform.value.direccion;
              employee.numeroVia = x.employeeform.value.numero;
              employee.municipio = x.employeeform.value.municipio;
              employee.provincia = x.employeeform.value.provincia;
              employee.cp = x.employeeform.value.cp;
              employee.telefono = x.employeeform.value.telefono;
              employee.email = x.employeeform.value.email;
              employee.idCentro = employee.centro.idCentro;
              employee.oid = employee.centro.oid;
              console.log(x.employeeform.value);
              console.log(employee);
            })
            .then((p) => {
              if (this.service.user.empleadoId === id) {
                this.service
                  .putEmployeesAdmin(id, employee)
                  .then((o) => window.location.reload());
              } else {
                this.service
                  .putEmployees(id, employee)
                  .then((o) => window.location.reload());
              }
            });
        }
      });
    } else {
      this.components.forEach((x) => {
        if (id === x.employee.empleadoId) {
          // x.ngOnInit();
        }
      });
    }
    this.components.forEach((x) => {
      if (id === x.employee.empleadoId) {
        x.employeeform.controls.nombre.disable();
        x.employeeform.controls.primerapellido.disable();
        x.employeeform.controls.segundoapellido.disable();
        x.employeeform.controls.direccion.disable();
        x.employeeform.controls.numero.disable();
        x.employeeform.controls.municipio.disable();
        x.employeeform.controls.provincia.disable();
        x.employeeform.controls.cp.disable();
        x.employeeform.controls.telefono.disable();
        x.employeeform.controls.email.disable();
      }
    });

    document.getElementById(id + "btn").style.display = "block";
    document.getElementById(id).style.display = "none";
  }

  getEmployees() {
    this.employees = [];
    this.service.client?.centros.forEach((x) => {
      this.employees = this.employees.concat(x.empleados);
      console.log(this.employees);
    });
    this.employeesAll = this.employees;
    this.chargeLetters();
  }

  goTo(letter) {
    let l = document.getElementsByClassName("l");
    Array.prototype.forEach.call(l, (x) => {
      x.style = "none";
    });

    let ls = document.getElementsByClassName("ls");
    Array.prototype.forEach.call(ls, (x) => {
      x.style = "none";
    });
    let key = document.getElementById(letter);
    //key.style.color = "#ffd740";
    key.style.fontWeight = "bold";
    key.style.animationName = "example";
    key.style.animationDuration = "9s";

    let a = document.getElementById(letter + "a");
    a.style.fontWeight = "bold";
    //a.style.color = "#ffd740";
    a.style.animationName = "example";
    a.style.animationDuration = "9s";
    key.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  public filterByLetter(letter) {
    const emps = this.employees
      .filter((e) => e.nombre)
      .filter((o) => o.nombre.startsWith(letter));
    return emps;
  }

  reset() {
    this.searchText = "";
    this.search(this.searchText);
  }

  search(q) {
    this.employees = this.employeesAll;
    this.employees = this.employees
      .filter((e) => e.nombre)
      .filter(
        (n) =>
          n.nombre.toLowerCase().includes(q.toLowerCase()) ||
          n.primerApellido.toLowerCase().includes(q.toLowerCase()) ||
          n.segundoApellido.toLowerCase().includes(q.toLowerCase()) ||
          n.dni.toLowerCase().includes(q.toLowerCase())
      );
    this.chargeLetters();
    console.log(this.employees);
  }

  filterCenter(id) {
    console.log(id);
    this.employees = this.employeesAll;
    this.employees = this.employees.filter((c) => c.idCentro === id);
    this.chargeLetters();
    console.log(this.employees);
  }

  chargeLetters() {
    this.letters2 = [];
    this.letters.forEach((x) => {
      if (this.filterByLetter(x).length > 0) {
        this.letters2.push(x);
      }
    });
  }

  openDialog(data, action) {
    let e: Employee;

    this.service
      .getEmployee(data)
      .then((x) => (e = x))
      .then((y) => {
        const dialogRef = this.dialog.open(PopUpComponent);
        dialogRef.componentInstance.employee = e;
        dialogRef.componentInstance.action = action;
      });
  }

  save() {}
}
