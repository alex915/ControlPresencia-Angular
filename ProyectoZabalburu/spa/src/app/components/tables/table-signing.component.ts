import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Signing } from '../../models/signing';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Device } from '../../models/device';
import { Employee } from '../../models/employee';
import { SigningService } from '../../Services/signing.service';
let ELEMENT_DATA: Signing[] = [];
@Component({
  selector: 'app-table-signing',
    template: `
<div *ngIf="this.fichajes.length == 0">
<mat-card id="message"><mat-icon style="margin-right:25px">info</mat-icon> <span> No hay datos que mostrar </span></mat-card>
</div>

<div *ngIf="this.fichajes.length > 0">

    <mat-table [dataSource]="dataSource">
  <!-- Position Column -->
  <ng-container matColumnDef="codEmpleado" *ngIf="this.employees.length > 0">
    <mat-header-cell *matHeaderCellDef> Empleado </mat-header-cell>
    
    <mat-cell *matCellDef="let element"><span class="mobile-label">Empleado:</span>
{{getEmployee(element.codEmpleado)?.nombre}} {{getEmployee(element.codEmpleado)?.primerApellido}} {{getEmployee(element.codEmpleado)?.segundoApellido}}</mat-cell>
  </ng-container> 

<ng-container matColumnDef="codEmpleado" *ngIf="employees.length===0">
    <mat-header-cell *matHeaderCellDef> codEmpleado </mat-header-cell>
    
    <mat-cell *matCellDef="let element"><span class="mobile-label">Empleado:</span>
{{service.user.nombre}} {{service.user.primerApellido}} {{service.user.segundoApellido}}</mat-cell>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="codTipoFichaje">
    <mat-header-cell *matHeaderCellDef> Tipo</mat-header-cell>

    <mat-cell *matCellDef="let element"> <span class="mobile-label">Tipo:</span> {{labels(element.codTipoFichaje)}} </mat-cell>
  </ng-container>

  <!-- Weight Column -->
  <ng-container matColumnDef="fecha">
    <mat-header-cell *matHeaderCellDef> Fecha </mat-header-cell>
 
    
    <mat-cell *matCellDef="let element"><span class="mobile-label">Fecha:</span> {{element.fecha | date:'dd/MM/yyyy  hh:mm:ss'}} </mat-cell>
  </ng-container>

  <!-- Symbol Column -->
  <ng-container matColumnDef="idDispositivo">
    <mat-header-cell *matHeaderCellDef> Dispositivo </mat-header-cell>

    <mat-divider></mat-divider>
    <mat-cell *matCellDef="let element"> <span class="mobile-label">Dispositivo:</span> {{getDevice(element.idDispositivo)?.descripcion}} </mat-cell>
  </ng-container>

  <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
  <mat-row *matRowDef="let row; columns: displayedColumns;" [class]="mis"></mat-row>

</mat-table>
</div>
<mat-paginator [pageSizeOptions]="[5, 10]" [pageSize]="10" showFirstLastButtons id="paginator" color="accent"></mat-paginator>


  `,
    styles: [`

 .mat-header-cell{
        
      }

#message{
    background-color:rgba(255,0,0,0.2);
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    display:flex;
    align-items:center
}

.mobile-label {
  display:none
}


@media(max-width: 650px) {
  .mobile-label {
    width: 100px;
    display: inline-block;
        font-weight: bold;
  }

  .mat-header-row {
    display: none;
  }
.mat-cell{
padding:0px
}

  .mat-row { 
    flex-direction: column;
    align-items: start;
    padding: 8px 24px;
height:218px
  }

.mis{
height:175px

}

}


        `
  ]
})
export class TableSigningComponent implements OnInit {
    @Input() public signings: any[];
    @Input() public devices: Device[];
    @Input() public employees: Employee[];
    @Input() public type: string;
    displayedColumns: string[];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    public fichajes: any[];
    mis: String = "";


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(public service: SigningService) {
    }

    ngOnInit() {
        this.getSignings();
        this.fillTable();
        console.log(this.devices);
        if (this.employees.length > 0) {
            this.displayedColumns = ['codEmpleado', 'codTipoFichaje', 'fecha', 'idDispositivo'];

        } else {
            this.displayedColumns = ['codTipoFichaje', 'fecha', 'idDispositivo'];
            this.mis = "mis";
        }
        if (this.fichajes.length == 0) {
            document.getElementById("paginator").style.display = "none";
        }
        
    }

    public async getSignings() {
        this.fichajes = this.signings
        ELEMENT_DATA = this.fichajes;
       
    }

    fillTable() {

        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
       
    }

    getDevice(id) {
      
        return this.devices.filter(d => d.idDispositivo === id)[0];
    }
    getEmployee(id) {
        return this.employees.filter(e => e.empleadoId === id)[0];

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