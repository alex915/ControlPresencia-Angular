import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SigningService } from '../../Services/signing.service';
import { Center } from '../../models/center'

let ELEMENT_DATA: Center[] = [];

@Component({
  selector: 'app-table-material',
  template: `
    <div>
  <mat-label>Buscar por nombre</mat-label>
  <input matInput (keyup)="applyFilter($event)" placeholder="Ex. ium">
</div>

<div class="one" >
<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

console.log(C)
<!-- Id Centro -->
  <ng-container matColumnDef="idCentro">
    <th mat-header-cell *matHeaderCellDef> IdCentro </th>
    <td mat-cell *matCellDef="let element"> {{element.idCentro }} </td>
  </ng-container>

<!-- Id Centro -->
  <ng-container matColumnDef="codigoCtrTrabajo">
    <th mat-header-cell *matHeaderCellDef> codigoCtrTrabajo </th>
    <td mat-cell *matCellDef="let element"> {{element.codigoCtrTrabajo}} </td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="poblacion">
    <th mat-header-cell *matHeaderCellDef> Poblacion </th>
    <td mat-cell *matCellDef="let element"> {{element.poblacion}} </td>
  </ng-container>


  <!-- Weight Column -->
  <ng-container matColumnDef="cp">
    <th mat-header-cell *matHeaderCellDef> cp </th>
    <td mat-cell *matCellDef="let element"> {{element.cp}} </td>
  </ng-container>

  <!-- Symbol Column -->
  <ng-container matColumnDef="usuarioCreacion">
    <th mat-header-cell *matHeaderCellDef> usuarioCreacion </th>
    <td mat-cell *matCellDef="let element"> {{element.usuarioCreacion}} </td>
  </ng-container>

<!-- Symbol Column -->
  <ng-container matColumnDef="fechaCreacion">
    <th mat-header-cell *matHeaderCellDef> fechaCreacion </th>
    <td mat-cell *matCellDef="let element"> {{element.fechaCreacion}} </td>
  </ng-container>

<ng-container matColumnDef="usuarioModificacion">
    <th mat-header-cell *matHeaderCellDef> usuarioModificacion </th>
    <td mat-cell *matCellDef="let element"> {{element.usuarioModificacion}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>

<mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
</div>

  `,
    styles: [
      `div{
      width: 80%;
margin:auto
    }
table{
width: 100%;
}
`
  ]
})
export class TableMaterialComponent implements OnInit {
    @Input() type: string;
    @Input() public centros: any[];
    displayedColumns: string[] = ['idCentro', 'codigoCtrTrabajo', 'poblacion', 'cp', 'usuarioCreacion', 'fechaCreacion', 'usuarioModificacion'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    public centers: any[];
    public results: any;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    constructor(public service: SigningService) { }

    ngOnInit() {
       
        this.getCenters();
        this.fillTable();
        console.log(this.centros);
    }
    public async getCenters() {
        //this.centers = await this.service.getAllCenters();
        //console.log(this.centers[0]);
        this.centers = this.centros;
      
        ELEMENT_DATA = this.centers;
       
        
        
    }

    fillTable() {

        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
    }

    public async applyFilter(event: Event) {
        this.dataSource.filterPredicate = function (data, filter: string): boolean {
            return data.codigoCtrTrabajo.toLowerCase().includes(filter);
        };
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        
    }

}
