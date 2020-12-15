import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { FormControl } from "@angular/forms";
import { Device } from "../../models/device";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SigningService } from "../../Services/signing.service";
import { PopUpComponent } from "../pop-up/pop-up.component";
let ELEMENT_DATA: Device[] = [];
@Component({
  selector: "app-table-devices",
  template: `
    <mat-table [dataSource]="dataSource">
      <!-- Position Column -->
      <ng-container matColumnDef="codigo">
        <mat-header-cell *matHeaderCellDef> Código </mat-header-cell>
        <mat-cell *matCellDef="let element"
          ><span class="mobile-label">Código:</span> {{ element.codigo }}
        </mat-cell>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="descripcion">
        <mat-header-cell *matHeaderCellDef> Descripción </mat-header-cell>
        <mat-cell *matCellDef="let element"
          ><span class="mobile-label">Descripción:</span>
          {{ element.descripcion }}
        </mat-cell>
      </ng-container>

      <!-- Weight Column -->
      <ng-container matColumnDef="codTipoDispositivo">
        <mat-header-cell *matHeaderCellDef> Tipo </mat-header-cell>
        <mat-cell *matCellDef="let element"
          ><span class="mobile-label">Tipo:</span>
          {{labels(element.codTipoDispositivo) }}
        </mat-cell>
      </ng-container>

      <!-- Weight Column
      <ng-container matColumnDef="idModem">
        <mat-header-cell *matHeaderCellDef> Modem </mat-header-cell>
        <mat-cell *matCellDef="let element">
          <span class="mobile-label">Modem:</span>{{ element.idModem }}
        </mat-cell>
      </ng-container> -->

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
    </mat-table>
    <!-- <mat-paginator [pageSizeOptions]="[5, 10]" showFirstLastButtons></mat-paginator> -->
  `,
  styles: [
    `
      mat-table {
        padding: 0;
        margin: 0;
      }
      .mobile-label {
        display: none;
      }

      @media (max-width: 650px) {
        .mobile-label {
          width: 100px;
          display: inline-block;
          font-weight: bold;
        }

        .mat-header-row {
          display: none;
        }
        .mat-cell {
          padding: 0px;
        }

        .mat-row {
          flex-direction: column;
          align-items: start;
          padding: 8px 24px;
          height:218px
        }
      }
    `,
  ],
})
export class TableDevicesComponent implements OnInit {
  @Input() public devices: any[];
  displayedColumns: string[] = [
    "codigo",
    "descripcion",
    "codTipoDispositivo",
    // "idModem",
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  //public fichajes: any[];

  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public service: SigningService) {}

  ngOnInit(): void {
    this.fillTable();
  }

  fillTable() {
    ELEMENT_DATA = this.devices;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    //  this.dataSource.paginator = this.paginator;
  }

  openDialog(data, action) {
    let d: Device;

    this.service
      .getDevice(data)
      .then((x) => (d = x))
      .then((y) => {
        const dialogRef = this.dialog.open(PopUpComponent);
        dialogRef.componentInstance.device = d;
        dialogRef.componentInstance.action = action;
      });
  }
  labels(id):string{
    switch (id) {
      case 10:
          return "Con Tarjeta";
      case 11:
          return "Con Código";
      case 12:
          return "Con Huella";
      case 13:
          return "Con Iris";
      case 14:
          return "Plataforma Web";
     
  }
  }
}
