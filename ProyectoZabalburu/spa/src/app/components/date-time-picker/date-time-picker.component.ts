import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-time-picker',
  template: `
     <mat-form-field (click)="picker.open()" color="accent"> <mat-icon matDatepickerToggleIcon>today</mat-icon>
  <input matInput  [ngxMatDatetimePicker]="picker" [placeholder]="type" 
[formControl]="dateControl" (dateInput)="addEvent('input', $event)" (dateChange)="addEvent('change', $event)">
    
      <ngx-mat-datetime-picker #picker color="accent">
  </ngx-mat-datetime-picker>
</mat-form-field>
  `,
    styles: [`mat-icon{
    width: 100% !important;
    text-align: right;
    font-size: 20px;
    cursor: pointer;

}

mat-form-field{
    width:100%
}
#cdk-overlay-0{
background-color:black
}

::ng-deep .table{
 color:white
}
::ng-deep .table .spacer{
 padding-top:25px
}



`
  ]
})
export class DateTimePickerComponent implements OnInit {
    dateControl = new FormControl();
    dateFrom: Date;
    dateTo: Date;
    @Input() type;
    @Input() time: boolean;
    
  
  constructor() { }

  ngOnInit(): void {
  }

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        if (this.type === "Desde") {
            this.dateFrom = event.value;
        }

        if (this.type === "Hasta") {
            this.dateTo = event.value;
        }
        
      


    }

}
