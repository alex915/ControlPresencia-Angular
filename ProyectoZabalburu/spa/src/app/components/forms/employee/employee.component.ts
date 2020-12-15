import { Component, OnInit, Input } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Employee } from "src/app/models/employee";
import { SigningService } from 'src/app/Services/signing.service';

@Component({
  selector: "app-employee-form",
  template: `
    <form [formGroup]="employeeform" class="form">
      <mat-form-field class="basis" style="flex-basis:450px" color="accent">
        <mat-label>Nombre</mat-label>
        <input
          formControlName="nombre"
          matInput 
          value=""
          [readonly]="readonly"
          
           
        />
        <mat-error *ngIf="hasError('nombre', 'required')"
          >El nombre es obligatorio</mat-error
        >
      </mat-form-field>

      <mat-form-field class="basis" style="flex-basis:450px" color="accent">
        <mat-label>Primer Apellido</mat-label>
        <input
          formControlName="primerapellido"
          matInput
          [readonly]="readonly"

          
        />
        <mat-error *ngIf="hasError('primerapellido', 'required')"
          >El apellido es obligatorio</mat-error
        >
      </mat-form-field>

      <mat-form-field class="basis" style="flex-basis:450px" color="accent">
        <mat-label>Segundo Apellido</mat-label>
        <input
          formControlName="segundoapellido"
          matInput
          [readonly]="readonly"
        />
      </mat-form-field>

      <mat-form-field class="basis" style="flex-basis:200px" color="accent">
        <mat-label>Fecha Nacimiento</mat-label>

  <input matInput [matDatepicker]="picker" [readonly]="readonly" formControlName="fnac" color="accent">
  <mat-datepicker-toggle matSuffix [for]="picker">
    <mat-icon matDatepickerToggleIcon>today</mat-icon>
  </mat-datepicker-toggle>
  <mat-datepicker #picker color="accent"></mat-datepicker>


      </mat-form-field>

      <mat-form-field class="basis" style="flex-basis:200px" color="accent">
        <mat-label>DNI</mat-label>
        <input formControlName="dni" matInput [readonly]="readonly" />
      </mat-form-field>

      <mat-form-field class="basis" style="flex-basis:700px" color="accent">
        <mat-label>Direccion</mat-label>
        <input
          formControlName="direccion"
          matInput
          placeholder="Ej. Alameda de Recalde"
          [readonly]="readonly"
        />
      </mat-form-field>
      <mat-form-field class="basis" style="flex-basis:200px" color="accent">
        <mat-label>Numero</mat-label>
        <input
          formControlName="numero"
          type="number"
          matInput
          [readonly]="readonly"
        />
      </mat-form-field>

      <mat-form-field class="basis" style="flex-basis:200px" color="accent">
        <mat-label>Municipio</mat-label>
        <input
          formControlName="municipio"
          matInput
          placeholder="Ej. Bilbao"
          [readonly]="readonly"
        />
      </mat-form-field>

      <mat-form-field class="basis" style="flex-basis:200px" color="accent">
        <mat-label>Provincia</mat-label>
        <input 
          formControlName="provincia"
          matInput
          placeholder="Ej. Vizcaya"
          [readonly]="readonly"
        />
      </mat-form-field>

      <mat-form-field class="basis" style="flex-basis:100px" color="accent">
        <mat-label>Codigo Postal</mat-label>
        <input
          formControlName="cp"
          matInput
          #postalCode
          maxlength="5"
          placeholder="Ej. 48001"
          [readonly]="readonly"
        />
        <mat-hint align="end">{{ postalCode.value.length }} / 5</mat-hint>
      </mat-form-field>

      <mat-form-field class="basis" style="flex-basis:450px" color="accent">
        <mat-label>Teléfono</mat-label>
        <input
          formControlName="telefono"
          matInput
          type="tel"
          maxlength="9"
          placeholder="6xx xxx xxx"
          [readonly]="readonly"
        />
        <mat-error *ngIf="hasError('telefono', 'required')"
          >El teléfono es obligatorio</mat-error
        >
        <mat-error
          *ngIf="
            hasError('telefono', 'pattern') || hasError('telefono', 'minlength')
          "
          >El teléfono no es válido</mat-error
        >
      </mat-form-field>

      <mat-form-field class="basis" style="flex-basis:450px" color="accent">
        <mat-label>Email</mat-label>
        <input
          formControlName="email"
          type="mail"
          matInput
          placeholder="Ej. nombre@dominio.com"
          [readonly]="readonly"
        />
        <mat-error *ngIf="hasError('email', 'required')"
          >El email es obligatorio</mat-error
        >
        <mat-error
          *ngIf="hasError('email', 'email') || hasError('email', 'pattern')"
          >El email no tiene el formato correcto</mat-error
        >
      </mat-form-field>
      <mat-form-field *ngIf="!admin" color="accent" class="basis">
          <mat-label>Centros</mat-label>
          <mat-select formControlName="idCentro" required>
            <mat-option
              *ngFor="let group of this.service.client?.centros"
              [value]="group.idCentro">
              {{ group.codigoCtrTrabajo }}
            </mat-option>
          </mat-select>
 <mat-error *ngIf="hasError('idCentro', 'required')"
          >El centro es obligatorio</mat-error>
        </mat-form-field>
    </form>
  `,
  styles: [
    `
     
      .form {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        
      }


      .basis {
        margin:5px 20px;
        flex-grow: 3;
        curdor: auto
      }

      @media (max-width: 900px) {
        .basis {
          flex-basis: 100%;
        }
      }
    `,
  ],
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
    @Input() readonly: Boolean;
    @Input() edit: Boolean;
    @Input() admin: Boolean = false;
    employeeform: FormGroup;
  disabled = "true";
    inputs: any;
  constructor(private fb: FormBuilder, public service:SigningService) {}

  hasError = (control: string, error: string) => {
    return this.employeeform.controls[control].hasError(error);
  };

    ngOnInit(): void {
        this.inputs = document.getElementsByTagName("input");
        //console.log(this.inputs);
      
    if (this.employee) {
        this.employeeform = this.fb.group({
            nombre: new FormControl(this.employee.nombre,[Validators.required]),
        primerapellido: new FormControl(this.employee.primerApellido, [
          Validators.required,
        ]),
        segundoapellido: new FormControl(this.employee.segundoApellido),
        fnac: new FormControl(this.employee.fechaNacimiento),
        dni: new FormControl(this.employee.dni),
        direccion: new FormControl(this.employee.direccion),
        numero: new FormControl(this.employee.numeroVia),
        municipio: new FormControl(this.employee.municipio),
        provincia: new FormControl(this.employee.provincia),
        cp: new FormControl(this.employee.cp),
        idCentro: new FormControl(this.employee.idCentro),
        telefono: new FormControl(this.employee.telefono, [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(9),
          Validators.maxLength(9),
        ]),
        email: new FormControl(this.employee.email, [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ]),
      });
    } else {
      this.employeeform = this.fb.group({
        nombre: new FormControl("", [Validators.required]),
        primerapellido: new FormControl("", [Validators.required]),
        segundoapellido: new FormControl(""),
        fnac: new FormControl(""),
        dni: new FormControl(""),
        direccion: new FormControl(""),
        numero: new FormControl(""),
        municipio: new FormControl(""),
        provincia: new FormControl(""),
        cp: new FormControl(""),
        idCentro:new FormControl(),
        telefono: new FormControl("", [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(9),
          Validators.maxLength(9),
        ]),
        email: new FormControl("", [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ]),
      });
      }
     
        
        if (this.readonly) {
            //Object.keys(this.employeeform.controls).forEach(key => {
            //    console.log(key);
            //});

        this.employeeform.get("nombre").disable();
        this.employeeform.get("primerapellido").disable();
            this.employeeform.get("segundoapellido").disable();
            this.employeeform.get("direccion").disable();
            this.employeeform.get("numero").disable();
            this.employeeform.get("municipio").disable();
            this.employeeform.get("provincia").disable();
            this.employeeform.get("cp").disable();
            this.employeeform.get("telefono").disable();
            this.employeeform.get("email").disable();
            this.employeeform.get("fnac").disable();
            this.employeeform.get("dni").disable();
            this.employeeform.get("idCentro").disable();
 
            console.log(this.fb.group);

        } else {
            if (this.edit) {
                this.employeeform.get("fnac").disable();
                this.employeeform.get("dni").disable();

            }
           
 
 
    }
  }
}
