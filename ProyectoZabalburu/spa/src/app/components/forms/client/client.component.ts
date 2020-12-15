import { Component, OnInit,  Input } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Client } from "src/app/models/client";

@Component({
  selector: "app-client-form",
  template: `
    <form [formGroup]="clientform" class="form">
      <mat-form-field class="full-width" color="accent">
        <mat-label>Codigo Cliente</mat-label>
        <input formControlName="codigoCliente" matInput #ClientNameInput />
        <mat-error *ngIf="hasError('codigoCliente', 'required')">El código del cliente es obligatorio</mat-error>
      </mat-form-field>

      <mat-form-field class="full-width" color="accent">
        <mat-label>Descripcion</mat-label>
        <input formControlName="descripcion" matInput />
        <mat-error *ngIf="hasError('descripcion', 'required')">La descripción es obligatoria</mat-error>
      </mat-form-field>
    </form>
  `,
  styles: [
    `
      .form {
        width: 100%;
        margin:auto
      }

      .full-width {
        width: 100%;
      }
    `,
  ],
})
export class ClientComponent implements OnInit {
  @Input() client: Client;
  clientform: FormGroup;
  clientObj: any;

  constructor(private fb: FormBuilder) {

  }

  hasError = (control: string, error: string) =>{
    return this.clientform.controls[control].hasError(error);
  }

  ngOnInit(): void {
    this.clientform = this.fb.group({
      codigoCliente: new FormControl('',[Validators.required]),
      descripcion: new FormControl('',[Validators.required]),
    });
    if (this.client) {
      this.clientObj = {
        codigoCliente: this.client.codigoCliente,
        descripcion: this.client.descripcion,
      };
      this.clientform.setValue(this.clientObj);
    }
   
  }
}
