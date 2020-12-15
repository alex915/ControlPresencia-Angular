import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Employee } from "../../models/employee";
import { MatTableDataSource } from "@angular/material/table";
import { SigningService } from "../../Services/signing.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from "../pop-up/pop-up.component";
let ELEMENT_DATA: Employee[] = [];
@Component({
  selector: "app-table-employees",
  template: `
    <mat-table [dataSource]="dataSource">
      <!-- Position Column -->
      <ng-container matColumnDef="nombre">
        <mat-header-cell *matHeaderCellDef> Nombre </mat-header-cell>
        <mat-cell *matCellDef="let element">
          <span class="mobile-label">Nombre:</span>{{ element.nombre }}
          {{ element.primerApellido }} {{ element.segundoApellido }}
        </mat-cell>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="email">
        <mat-header-cell *matHeaderCellDef> Email </mat-header-cell>
        <mat-cell *matCellDef="let element">
          <span class="mobile-label">Email:</span>{{ element.email }}
        </mat-cell>
      </ng-container>

      <!-- Weight Column -->
      <ng-container matColumnDef="telefono">
        <mat-header-cell *matHeaderCellDef> Teléfono </mat-header-cell>
        <mat-cell *matCellDef="let element">
          <span class="mobile-label">Teléfono:</span>{{ element.telefono }}
        </mat-cell>
      </ng-container>

      <!-- Weight Column -->
      <ng-container matColumnDef="fechaAlta">
        <mat-header-cell *matHeaderCellDef> Fecha Alta </mat-header-cell>
        <mat-cell *matCellDef="let element"
          ><span class="mobile-label">Fecha Alta:</span
          >{{ element.fechaAlta | date: "dd/MM/yyyy" }}
        </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
    </mat-table>

    <mat-paginator 
      color="accent"
      [pageSizeOptions]="[5, 10]"
      showFirstLastButtons
    ></mat-paginator>


  `,
  styles: [
    `
      .mat-column-editar {
        flex: 0 0 5%;
      }
      .mat-column-eliminar {
        flex: 0 0 5%;
      }
      .mat-table {
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
export class TableEmployeesComponent implements OnInit {
    @Input() public employees: any[];
    @Input() public moreTen: Boolean;
  displayedColumns: string[] = ["nombre", "email", "telefono", "fechaAlta"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public service: SigningService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fillTable();
  }

  fillTable() {
      ELEMENT_DATA = this.employees;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

     
    
   
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
}
