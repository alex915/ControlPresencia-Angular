import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { SigningService } from "src/app/Services/signing.service";
import { Client } from "src/app/models/client";
import { Center } from '../../../models/center';

@Component({
  selector: "app-center-form",
  template: `
    <form [formGroup]="centerform" class="form">
      <mat-form-field class="full-width">
        <mat-label>Cliente</mat-label>
    
        <input formControlName="cliente" matInput disabled value="{{ this.client }}" *ngIf="this.center" />
        <input  matInput disabled value="{{ this.client }}" *ngIf="!this.center" />
      </mat-form-field>

      <mat-form-field class="full-width" color="accent">
        <mat-label>Codigo Centro</mat-label>
        <input formControlName="codigoCtrTrabajo" matInput />
        <mat-error *ngIf="hasError('codigoCtrTrabajo', 'required')">El centro es obligatorio</mat-error>
      </mat-form-field>

      <mat-form-field class="full-width" color="accent">
        <mat-label>Poblacion</mat-label>
        <input formControlName="poblacion" matInput placeholder="Ej. Bilbao" />
        <mat-error *ngIf="hasError('poblacion', 'required')">La población es obligatoria</mat-error>
      </mat-form-field>

      <mat-form-field class="full-width" color="accent">
        <mat-label>Codigo Postal</mat-label>
        <input
          formControlName="cp"
          matInput
          #postalCode
          maxlength="5"
          placeholder="Ej. 48001"
        />
        <mat-error *ngIf="hasError('cp', 'required')">El código postal es obligatorio</mat-error>
        <mat-hint align="end">{{ postalCode.value.length }} / 5</mat-hint>
      </mat-form-field>
    </form>
  `,
  styles: [
    `
      .form {
       
        width: 100%;
        margin:auto;
      }

      .full-width {
        width: 100%;
      }
    `,
  ],
})
export class CenterComponent implements OnInit {
  centerform: FormGroup;
    @Input() client: String;
    @Input() center: Center;
  constructor(private fb: FormBuilder, public service: SigningService) {}

  hasError = (control: string, error: string) => {
    return this.centerform.controls[control].hasError(error);
  };

  ngOnInit(): void {

      if (this.center) {
          this.centerform = this.fb.group({
              cliente: new FormControl({ value: this.center.cliente.descripcion, disabled: true }),
              codigoCtrTrabajo: new FormControl(this.center.codigoCtrTrabajo),
              poblacion: new FormControl(this.center.poblacion),
              cp: new FormControl(this.center.cp),
          });

      } else {
      this.centerform = this.fb.group({
          codigoCtrTrabajo: new FormControl("", [Validators.required]),
          poblacion: new FormControl("", [Validators.required]),
          cp: new FormControl("", [Validators.required]),
    });


      }
  }
}
