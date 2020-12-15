import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Device } from '../../../models/device';
import { SigningService } from '../../../Services/signing.service';

@Component({
  selector: 'app-device',
  template: `
  

 <form [formGroup]="deviceForm" class="form">
     <mat-form-field class="full-width">
        <mat-label>Codigo</mat-label>
        <input formControlName="codigo" matInput>
     </mat-form-field>
     <mat-form-field class="full-width">
        <mat-label>Descripcion</mat-label>
        <input formControlName="descripcion" matInput>
     </mat-form-field>
    <mat-form-field class="full-width">
        <mat-label>Tipo</mat-label>
        <input formControlName="descripcion" matInput>
     </mat-form-field>
</form>

  `,
  styles: [
  ]
})
export class DeviceComponent implements OnInit {
    deviceForm: FormGroup;
    @Input() device: Device;
    constructor(private fb: FormBuilder, public service: SigningService) {

        
    }

    ngOnInit(): void {
         
        this.deviceForm = this.fb.group({
            codigo: new FormControl(this.device.codigo),
            descripcion: new FormControl(this.device.descripcion),
            tipo: new FormControl(this.device.codTipoDispositivo),
            //modem: new FormControl(this.device.Modem),

        })
  }

}
