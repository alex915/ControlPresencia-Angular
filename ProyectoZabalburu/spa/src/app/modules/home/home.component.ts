import { Component, OnInit } from "@angular/core";
import { SigningService } from "src/app/Services/signing.service";
import { TooltipPosition } from "@angular/material/tooltip";
import { FormControl } from "@angular/forms";
import * as moment from "moment";
import { Client } from "src/app/models/client";
import { Center } from "src/app/models/center";
import { constants } from 'src/colors';
import { AuthenticationService } from 'src/app/Services/auth.service';

@Component({
  selector: "app-home",
  template: `
    <mat-toolbar>
      <span>Dashboard</span>
    </mat-toolbar>
    <div class="flex">
      <mat-card *ngIf="this.serviceAuth.getUserProfile().roles[0] === 'Admin'">
        <mat-card-header>
          <mat-card-title
            >Dispositivos por Centro</mat-card-title
          ></mat-card-header
        >
        <app-pie
          *ngIf="dataTotalDevices.length"
          [labels]="totalDevicesLabel"
          [dataset]="dataTotalDevices"
        ></app-pie
      ></mat-card>
      <mat-card *ngIf="this.serviceAuth.getUserProfile().roles[0] === 'Admin' || this.serviceAuth.getUserProfile().roles[0] === 'User'">
        <mat-card-header>
          <mat-card-title
            >Mis Fichajes</mat-card-title
          ></mat-card-header
        >
        <mat-card-content class="roundc" *ngIf="!databar.length">
        <mat-spinner  color="accent"></mat-spinner>
        </mat-card-content>
        <app-bar
          *ngIf="databar.length"
          [label]="monthlists"
          [dataset]="databar"
        ></app-bar
      ></mat-card>
      <mat-card *ngIf="this.serviceAuth.getUserProfile().roles[0] === 'Admin'">
        <mat-card-header>
          <mat-card-title
            >Total de Fichajes</mat-card-title
          ></mat-card-header
        >
        <mat-card-content class="roundc" *ngIf="!databarClient.length">
        <mat-spinner  color="accent"></mat-spinner>
        </mat-card-content>
        <app-bar
          *ngIf="databarClient.length"
          [label]="monthlists"
          [dataset]="databarClient"
        ></app-bar
      ></mat-card>

      <mat-card *ngIf="this.serviceAuth.getUserProfile().roles[0] === 'Admin'">
        <mat-card-header>
          <mat-card-title
            >Fichajes Totales por Centro en
            {{ monthString(monthnow()) }}</mat-card-title
          ></mat-card-header
        >
        <mat-card-content class="roundc" *ngIf="!dataTotalDay.length">
        <mat-spinner  color="accent"></mat-spinner>
        </mat-card-content>
        <app-line
          *ngIf="dataTotalDay.length"
          [labels]="totalDayLabel"
          [data]="dataTotalDay"
        ></app-line
      ></mat-card>
      <mat-card *ngIf="this.serviceAuth.getUserProfile().roles[0] === 'User'||this.serviceAuth.getUserProfile().roles[0] === 'Admin'">
        <mat-card-header >
          <mat-card-title>Total de Fichajes</mat-card-title></mat-card-header
        >
        <div class="roundc">
          <div class="round">
            <span class="big">{{ monthString(monthnow()) }}</span>
            <span class="big">{{ number }}</span>
          </div>
        </div>
      </mat-card>
      <mat-card *ngIf="this.serviceAuth.getUserProfile().roles[0] === 'Super'">
        <mat-card-header>
          <mat-card-title>Total de Clientes</mat-card-title></mat-card-header
        >
        <div class="roundc">
          <div class="round">
            <span class="big">{{ totalClient }}</span>
          </div>
        </div>
      </mat-card>
   
<app-btn-fichar></app-btn-fichar>
      
    </div>

  `,
  styles: [
    `
    .big{
      font-size: 2rem;
    }

      #btn {
        position: fixed;
        bottom: 0;
        right: 0;
        margin: 30px;
        z-index: 100;
      }
      mat-card {
        width: 48%;
        flex: 500px;
        margin: 8px;
        padding: 40px;
      }

      @media (min-width: 900px) {
      .disab{
        display:none;
      }
    }
      @media (max-width: 1100px) {
        mat-card {
          width: 48%;
          flex: 430px;
          margin: 8px;
          padding: 20px;
        }
        .round {
          height: 150px !important;
          width: 150px !important;
        }
      }
      .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 8px;
      }
      .round {
        height: 250px;
        width: 250px;
        background-color: #ffd740;
        border-radius: 50%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        color: black;
      }
      .roundc {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        min-height: 200px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  positionOptions: TooltipPosition[] = ["below", "above", "left", "right"];
  position = new FormControl(this.positionOptions[0]);
  number: number;
  public databar: any = [];
  databarClient: any = [];
  monthlist: number[] = this.month();
  totalClient: number = 0;
  totalDevicesLabel: string[] = [];
  totalDayLabel: string[] = [];
  dataTotalDevices: any = [];
  dataTotalDay: any = [];
  monthlists:any = this.listmonth();
  constructor(public service: SigningService,public serviceAuth: AuthenticationService) {}

  ngOnInit(): void {
    if (this.serviceAuth.getUserProfile().roles[0] === 'Super'
    ) {
      
      this.service.getAllClients().then((x: Client[]) => {
        this.totalClient = x.length;
      });
    } 

    //Total fichajes del mes
    if (this.serviceAuth.getUserProfile().roles[0] === 'User'||this.serviceAuth.getUserProfile().roles[0] === 'Admin'
    ) {
    this.service
      .totalMonthEmployee(this.service.user.empleadoId)
      .then((x: number) => (this.number = x));
    }
    
    if (this.serviceAuth.getUserProfile().roles[0] === 'User'||this.serviceAuth.getUserProfile().roles[0] === 'Admin'
    ) {
    this.service
      .totalYearEmployee(this.service.user.empleadoId)
      .then((x: number[]) => {
       
        this.databar.push({ data: x, label: "Histórico", backgroundColor: constants.colors[0],
        borderColor: '',
        borderWidth: 0,
        hoverBackgroundColor:"#ffd740",
      });
      });
    }
    if (this.serviceAuth.getUserProfile().roles[0] === 'Admin'
    ) {
    this.service.client.centros.forEach((x: Center, index: number) => {
      this.service.totalMonthCenter(x.idCentro).then((y: number[]) => {
        this.databarClient.push({
          data: y,
          label: x.codigoCtrTrabajo,
          backgroundColor: constants.colors[index],
          borderColor: '',
          borderWidth: 0,
        });
      });
    });
  }
  if (this.serviceAuth.getUserProfile().roles[0] === 'Admin'
    ) {
    this.service.client.centros.forEach((x: Center, index: number) => {
      this.service.totalDay(x.idCentro).then((y: number[]) => {
        this.dataTotalDay.push({
          data: y,
          label: x.codigoCtrTrabajo,
          backgroundColor: constants.colors[index],
          borderColor: '',
          borderWidth: 0,
        });
      });
    });
  }
    let day = moment().date();
    for (let index = 1; index <= day; index++) {
      this.totalDayLabel.push(index.toString());
    }
    if (this.serviceAuth.getUserProfile().roles[0] === 'Admin'
    ) {
    this.totalDeviceCenter();
    }
  }

  totalDeviceCenter() {
    this.service.client.centros.forEach((x: Center) => {
      this.totalDevicesLabel.push(x.codigoCtrTrabajo);

      this.dataTotalDevices.push(x.dispositivos.length);
    });
  }

  monthnow(): number {
    let date = new Date();
    let month = moment(date).get("month") + 1;
    return month;
  }

  month(): number[] {
    let month = this.monthnow();
    let list: number[] = [];
    for (let i = month; i > 0; i--) {
      list.unshift(i);
    }
    for (let i = 12; i > month; i--) {
      list.unshift(i);
    }
    return list;
  }

  monthString(month: number) {
    switch (month) {
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4:
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosto";
      case 9:
        return "Septiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      case 12:
        return "Diciembre";
    }
  }

  listmonth(): string[] {
    let list: string[] = [];
    this.monthlist.forEach((x) => {
      list.push(this.monthString(x));
    });
    return list;
  }
}
