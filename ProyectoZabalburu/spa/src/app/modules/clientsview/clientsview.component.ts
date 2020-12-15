import { Component, OnInit } from "@angular/core";
import { SigningService } from "../../Services/signing.service";
import { Client } from "../../models/client";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from "../../components/pop-up/pop-up.component";
import { NgxSpinnerService } from "ngx-spinner";
import { Center } from "src/app/models/center";

@Component({
  selector: "app-clientsview",
  template: `
    <mat-toolbar class="bar">
      <span>Clientes</span>
      <button mat-raised-button color="primary" routerLink="/clients/new">
        Crear Cliente
      </button>
    </mat-toolbar>

    <div id="container">
      <div id="search">
        <mat-form-field class="example-form-field" color="accent">
          <mat-label>Buscar Clientes</mat-label>
          <input
            matInput
            type="text"
            (keyup)="search(searchText)"
            [(ngModel)]="searchText"
          />
          <button
            mat-button
            *ngIf="searchText"
            matSuffix
            mat-icon-button
            aria-label="Clear"
            (click)="reset()"
          >
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>
      </div>
      <div class="son" *ngFor="let client of clients">
        <mat-accordion>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>
                <div>
                  <h2>{{ client.descripcion }}</h2>
                  <mat-chip-list>
                    <mat-chip color="accent" selected
                      ><mat-icon>business</mat-icon>
                      {{ (client.centros).length }}</mat-chip
                    >
                    <mat-chip color="accent" selected
                      ><mat-icon>devices</mat-icon>
                      {{ getStats(client.centros)[0] }}</mat-chip
                    >
                    <mat-chip color="accent" selected
                      ><mat-icon>people</mat-icon>
                      {{ getStats(client.centros)[1] }}</mat-chip
                    >
                  </mat-chip-list>
                </div>
              </mat-panel-title>
            </mat-expansion-panel-header>
            <mat-divider></mat-divider>
            <h3 class="title space">Centros</h3>
            <div class="space" *ngFor="let c of client.centros">
              <h3>{{ c.codigoCtrTrabajo }}</h3>
              <div class="column">
                <span>Dispositivos {{ c.dispositivos.length }}</span>
                <span>Empleados {{ c.empleados.length }}</span>
              </div>
            </div>
            <div class="margintop">
              <button
                mat-icon-button
                color="basic"
                (click)="openDialog(client.idCliente, 'edit')"
              >
                <mat-icon>edit</mat-icon>
              </button>

              <button
                mat-icon-button
                color="basic"
                (click)="openDialog(client.idCliente, 'delete')"
              >
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </mat-expansion-panel>
        </mat-accordion>
      </div>
      <!-- </cdk-virtual-scroll-viewport> -->
    </div>
  `,
  styles: [
    `
    .margintop{
      margin-top:30px;
      display:flex;
      justify-content:flex-end;
    }
      mat-icon {
        margin-right: 5px;
      }

      mat-expansion-panel-header {
        height: 100% !important;
        padding: 20px;
      }
      .title {
        font-weight: bold;
        text-align:center;
      }
      .space {
        margin-top: 10px;
      }
      .bar {
        display: flex;
        justify-content: space-between;
      }
      .column {
        display: flex;
        justify-content: space-around;
      }

      @media (max-width: 900px) {
        .son {
          margin: 0px;
          flex-basis: 100%;
          margin-bottom: 15px;
        }
        #search {
          padding: 0%;
          width: 100%;
        }
        #container {
          display: flex;
          flex-wrap: wrap;
          padding: 4.5%;
          justify-content: space-between;
        }
      }

      @media (min-width: 901px) {
        .son {
          margin: 5px;

          margin-bottom: 25px;
          flex: 300px;
        }
        #search {
          padding: 1%;
          width: 100%;
        }
        #container {
          display: flex;
          flex-wrap: wrap;
          padding: 2.5%;
          justify-content: space-between;
        }
      }

      .mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class ClientsviewComponent implements OnInit {
  panelOpenState = false;
  public searchText: string = "";

  constructor(
    public service: SigningService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}
  clients: any;

  ngOnInit(): void {
    this.spinner.show();
    this.service
      .getAllClients()
      .then((x) => {
        this.clients = x;
        this.spinner.hide();
      })
      .then((y) => console.log(this.clients));
  }

  async search(q) {
    this.clients = await this.service.searchElement(0, q);
    console.log(this.clients);
  }

  reset() {
    this.searchText = "";
    this.search(this.searchText);
  }

  getStats(c: Center[]): number[] {
    let dev = 0;
    let emp = 0;
    c.forEach((x) => {
      dev += x.dispositivos.length;
      emp += x.empleados.length;
    });

    let array: number[] = [dev, emp];

    return array;
  }

  openDialog(data, action) {
    let c: Client;

    this.service
      .getClient(data)
      .then((x) => (c = x))
      .then((y) => {
        const dialogRef = this.dialog.open(PopUpComponent);
        console.log(c);
        dialogRef.componentInstance.action = action;
        dialogRef.componentInstance.client = c;
      });
  }
}
