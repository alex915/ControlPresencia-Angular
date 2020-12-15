import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { SigningService } from "src/app/Services/signing.service";
import { Signing } from "src/app/models/signing";
import { DateTimePickerComponent } from "../date-time-picker/date-time-picker.component";
import { Device } from "src/app/models/device";
import { Employee } from "src/app/models/employee";
import { MediaMatcher } from "@angular/cdk/layout";
import { NgxSpinnerService } from "ngx-spinner";
import { Center } from "src/app/models/center";

@Component({
  selector: "app-signings",
  template: `
    <mat-sidenav-container class="height">
      <mat-sidenav
        class="fixit"
        #drawer
        [mode]="mobile.matches ? 'side' : 'over'"
        [opened]="mobile.matches ? 'true' : 'false'"
      >
        <button
          mat-mini-fab
          color="accent"
          (click)="drawer.toggle()"
          class="btnFilter"
          id="x"
        >
          x
        </button>

        <mat-form-field *ngIf="!this.own" color="accent">
          <mat-label>Centros</mat-label>
          <mat-select [formControl]="centersControl">
            <mat-option (click)="chargeSelectCenter(0)"
              >Todos los centros</mat-option
            >
            <mat-option
              *ngFor="let group of this.service.client?.centros"
              [value]="group.idCentro"
              (click)="chargeSelectCenter(group.idCentro)"
            >
              {{ group.codigoCtrTrabajo }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field color="accent">
          <mat-label>Dispositivos</mat-label>
          <mat-select [formControl]="devicesControl">
            <mat-option>Todos los dispositivos</mat-option>
            <mat-option
              *ngFor="let d of devices"
              [value]="d.idDispositivo"
            >
              {{ d.descripcion }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field *ngIf="!this.own" color="accent">
          <mat-label>Empleados</mat-label>
          <mat-select [formControl]="employeesControl">
            <mat-option>Todos los empleados</mat-option>
            <mat-option
              *ngFor="let employee of employees"
              [value]="employee.empleadoId"
            >
              {{ employee.nombre }}
              {{ employee.primerApellido }}
              {{ employee.segundoApellido }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field color="accent">
          <mat-label>Tipo</mat-label>
          <mat-select [formControl]="typeControl">
            <mat-option>Todos los tipos</mat-option>
            <mat-option *ngFor="let type of types" [value]="type">
              {{ labels(type) }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <app-date-time-picker #one type="Desde"></app-date-time-picker>
        <app-date-time-picker #two type="Hasta"></app-date-time-picker>

        <button
          mat-raised-button
          class="btnInside"
          color="primary"
          (click)="filterAll()"
        >
          Aplicar Filtros
        </button>

        <button
          mat-raised-button
          color="primary"
          class="btnInside"
          (click)="reset()"
        >
          Eliminar Filtros
        </button>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar class="bar">
          <span *ngIf="own">Mis Fichajes</span>
          <span *ngIf="!own">Fichajes</span>

          <button
            mat-raised-button
            color="primary"
            (click)="drawer.toggle()"
            class="btnFilter"
          >
            Filtrar
          </button>
        </mat-toolbar>

        <div class="cont" *ngIf="dataLoaded | async">
          <mat-card>
            <mat-card-header *ngIf="criterias()">
              <mat-card-title>Criterios</mat-card-title>
              <mat-card-subtitle>
                <mat-chip-list>
                  <mat-chip *ngIf="CenterCriteria !== ''">
                    {{ CenterCriteria }}
                    <mat-icon matChipRemove (click)="delcriteria('center')"
                      >cancel</mat-icon
                    >
                  </mat-chip>
                  <mat-chip *ngIf="DeviceCriteria !== ''">
                    {{ DeviceCriteria }}
                    <mat-icon matChipRemove (click)="delcriteria('device')"
                      >cancel</mat-icon
                    >
                  </mat-chip>
                  <mat-chip *ngIf="EmployeeCriteria !== ''">
                    {{ EmployeeCriteria }}
                    <mat-icon matChipRemove (click)="delcriteria('employee')"
                      >cancel</mat-icon
                    >
                  </mat-chip>
                  <mat-chip *ngIf="TypeCriteria !== ''">
                    {{ TypeCriteria }}
                    <mat-icon matChipRemove (click)="delcriteria('type')"
                      >cancel</mat-icon
                    >
                  </mat-chip>
                  <mat-chip *ngIf="DateFromCriteria !== ''">
                    {{ DateFromCriteria }}
                    <mat-icon matChipRemove (click)="delcriteria('date')"
                      >cancel</mat-icon
                    >
                  </mat-chip>
                  <mat-chip *ngIf="DateToCriteria !== ''">
                    {{ DateToCriteria }}
                    <mat-icon matChipRemove (click)="delcriteria('date2')"
                      >cancel</mat-icon
                    >
                  </mat-chip>
                </mat-chip-list>
              </mat-card-subtitle>
            </mat-card-header>
            <app-table-signing
              [signings]="signings"
              [devices]="devicesTodos"
              [employees]="employeesTodos"
            ></app-table-signing>
          </mat-card>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      @media (min-width: 900px) {
        .fixit {
          top: 0;
          padding-top: 82px;
          position: fixed;
        }
      }
      @media (max-width: 900px) {
        .fixit {
          height: calc(100vh);
        }
        .height {
          height: 100vh;
        }
      }

      #x {
        margin-left: 80%;
      }

      @media (min-width: 900px) {
        .btnFilter {
          display: none;
        }
      }

      .btnInside {
        width: 100%;
        margin: 10px 0px;
      }

      mat-sidenav {
        /*   position: fixed;
        height: 100%; */
        padding: 30px;
        -ms-overflow-style: none; /* IE 11 */
        scrollbar-width: none; /* Firefox 64 */
      }

      .cont {
        padding: 20px 16px;
      }
      .bar {
        display: flex;
        justify-content: space-between;
      }
      @media (max-width: 650px) {
        mat-sidenav-content {
          padding: 0px;
        }
        mat-sidenav {
          width: 90vw !important;
        }
      }

      mat-sidenav::-webkit-scrollbar,
      mat-sidenav-content::-webkit-scrollbar {
        display: none;
      }

      mat-sidenav {
        width: 350px;
      }

      mat-form-field {
        width: 100%;
        margin: 10px 0px;
      }
    `,
  ],
})
export class SigningsComponent implements OnInit {
  CenterCriteria: string = "";
  DeviceCriteria: string = "";
  EmployeeCriteria: string = "";
  TypeCriteria: string = "";
  DateFromCriteria: string = "";
  DateToCriteria: string = "";
  devicesTodos: Device[] = [];
  devices: Device[] = [];
  employees: Employee[] = [];
  employeesTodos: Employee[] = [];
  signings: Signing[] = [];
  signingsAll: Signing[] = [];
  centersControl = new FormControl();
  employeesControl = new FormControl();
  devicesControl = new FormControl();
  typeControl = new FormControl();
  dataLoaded: Promise<boolean>;
  promises: Promise<any>[] = [];
  types: string[] = ["ENT", "SAL", "STE", "L1", "L2", "L3", "L4"];
  @Input() own: boolean = false;
  @Input() id: string = null;
  @ViewChild("one") child: DateTimePickerComponent;
  @ViewChild("two") child2: DateTimePickerComponent;
  @ViewChild("chipList") chips: any;
  mobile: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    public service: SigningService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private spinner: NgxSpinnerService
  ) {
    this.mobile = media.matchMedia("(min-width: 900px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobile.addListener(this._mobileQueryListener);
    this.spinner.show();
  }

  ngOnInit(): void {
    this.getAllDevices();
    if (!this.own) {
      this.getAllEmployees();
      this.getAllSignings();
    } else {
      this.signingsAll = this.service.user.fichajes;
      this.signings = this.service.user.fichajes;
      this.devices = this.service.center.dispositivos;
      this.spinner.hide();
      this.dataLoaded = Promise.resolve(true);
    }
  }

  reset() {
    if (!this.own) {
      this.centersControl.reset();
      this.employeesControl.reset();
    }

    this.devicesControl.reset();
    this.typeControl.reset();
    this.child.dateControl.reset();
    this.child2.dateControl.reset();
    this.CenterCriteria = "";
    this.DeviceCriteria = "";
    this.EmployeeCriteria = "";
    this.TypeCriteria = "";
    this.DateFromCriteria = "";
    this.DateToCriteria = "";
    this.filterAll();
  }
  criterias(): boolean {
    if (
      this.CenterCriteria !== "" ||
      this.DeviceCriteria !== "" ||
      this.EmployeeCriteria !== "" ||
      this.TypeCriteria !== "" ||
      this.DateFromCriteria !== "" ||
      this.DateToCriteria !== ""
    ) {
      return true;
    }
    return false;
  }

  delcriteria(elem: string) {
    switch (elem) {
      case "center":
        this.CenterCriteria = "";
        this.centersControl.reset();
        break;
      case "device":
        this.DeviceCriteria = "";
        this.devicesControl.reset();
        break;
      case "employee":
        this.EmployeeCriteria = "";
        this.employeesControl.reset();
        break;
      case "type":
        this.TypeCriteria = "";
        this.typeControl.reset();
        break;
      case "date":
        this.DateFromCriteria = "";
        this.child.dateControl.reset();
        break;
      case "date2":
        this.DateToCriteria = "";
        this.child2.dateControl.reset();
        break;
    }
    this.filterAll();
  }

  filterAll() {
    this.signings = this.signingsAll;
    let signCenter: Signing[] = [];
    let center: Center;

    if (!this.own) {
      if (
        this.centersControl.value != null ||
        this.centersControl.value != undefined
      ) {
        center = this.service.client.centros.find(
          (x) => x.idCentro === this.centersControl.value
        );
        center.dispositivos.forEach((y) => {
          signCenter = [
            ...signCenter,
            ...this.signings.filter((x) => x.idDispositivo === y.idDispositivo),
          ];
        });
        this.signings = signCenter;
        this.CenterCriteria = center.codigoCtrTrabajo;
      }

      if (
        this.employeesControl.value != null ||
        this.employeesControl.value != undefined
      ) {
        this.signings = this.signings.filter(
          (x) => x.codEmpleado === this.employeesControl.value
        );
        this.service.client.centros.forEach((x) => {
          if (
            x.empleados.findIndex(
              (y) => y.empleadoId === this.employeesControl.value
            ) != -1
          ) {
            let emp = x.empleados.find(
              (z) => z.empleadoId === this.employeesControl.value
            );
            this.EmployeeCriteria = `${emp.nombre} ${emp.primerApellido} ${emp.segundoApellido}`;
          }
        });
      }
    }

    if (
      this.devicesControl.value != null ||
      this.devicesControl.value != undefined
    ) {
      this.signings = this.signings.filter(
        (x) => x.idDispositivo === this.devicesControl.value
      );
      this.service.client.centros.forEach((x) => {
        if (
          x.dispositivos.findIndex(
            (y) => y.idDispositivo === this.devicesControl.value
          ) != -1
        ) {
          let dev = x.dispositivos.find(
            (z) => z.idDispositivo === this.devicesControl.value
          );
          this.DeviceCriteria = dev.descripcion;
        }
      });
    }

    if (this.typeControl.value != null || this.typeControl.value != undefined) {
      this.signings = this.signings.filter(
        (x) => x.codTipoFichaje === this.typeControl.value
      );
      this.TypeCriteria = this.labels(this.typeControl.value);
    }

    if (
      this.child.dateControl.value != null ||
      this.child.dateControl.value != undefined
    ) {
      this.signings = this.signings.filter(
        (x) => new Date(x.fecha) >= new Date(this.child.dateFrom)
      );
      this.DateFromCriteria = new Date(this.child.dateFrom).toString();
    }

    if (
      this.child2.dateControl.value != null ||
      this.child2.dateControl.value != undefined
    ) {
      this.signings = this.signings.filter(
        (x) => new Date(x.fecha) <= new Date(this.child2.dateTo)
      );
      this.DateToCriteria = new Date(this.child2.dateTo).toString();
    }

    this.criterias();
    this.dataLoaded = Promise.resolve(true);
  }

  public getAllDevices() {
    this.service.client?.centros.forEach(
      (x) =>
        (this.devices = this.devices.concat(
          x.dispositivos
        ))
    );
          ;
    this.devicesTodos = [...this.devices];
  }

  public getAllEmployees() {
    this.service.client?.centros.forEach((x) => {
      this.employees = this.employees.concat(
        x.empleados
      );
    });

    this.employeesTodos = this.employees;
  }

  public getAllSignings() {
    this.promises = [];
    this.signings = [];
    this.service.client?.centros.forEach((x) =>
      x.dispositivos.forEach((y) => {
        if (y.estado === "A") {
          this.promises.push(this.service.getDevice(y.idDispositivo));
        }
      })
    );

    Promise.all(this.promises)
      .then((x) =>
        x.forEach((y) => {
          this.signings = this.signings.concat(y.fichajes);
        })
      )
      .then((y) => {
        console.log(this.signings);
        this.signingsAll = this.signings;
        this.dataLoaded = Promise.resolve(true);
        this.spinner.hide();
        if (this.id !== null) {
          this.centersControl.setValue(+this.id);
          this.filterAll();
        }
      });
  }

  chargeSelectCenter(id) {
    if (id === 0) {
      this.getAllEmployees();
      this.getAllDevices();
     
    } else {
      let center = this.service.client.centros.find((x) => x.idCentro === id);
      this.employees = center.empleados;
      this.devices = center.dispositivos;
    }
  }

  labels(type: string): string {
    switch (type) {
      case "ENT":
        return "Entrada";
      case "SAL":
        return "Salida";
      case "STE":
        return "Descanso";
      case "permiso":
        return "Permisos";
      case "L1":
        return "Visita Médico";
      case "L2":
        return "Funciones Sindicales";
      case "L3":
        return "Carácter familiar";
      case "L4":
        return "Deber inexcusable";
    }
  }
}
