import { Component, OnInit } from "@angular/core";
import { SigningService } from "src/app/Services/signing.service";
import { Signing } from "src/app/models/signing";
import { Device } from "src/app/models/device";
import { AuthenticationService } from "src/app/Services/auth.service";
import * as moment from 'moment';

@Component({
  selector: "app-signing",
  template: `
    <mat-toolbar class="bar">
      <div>
        <span>Nuevo Fichaje</span>
      </div>
      <button
        *ngIf="!visible && congrat"
        mat-raised-button
        color="primary"
        (click)="action('permiso')"
      >
        Notificar Permiso
      </button>
      <button
        *ngIf="visible && congrat"
        mat-raised-button
        color="primary"
        (click)="action('close')"
      >
        Fichar
      </button>
      <button
        *ngIf="!congrat"
        mat-raised-button
        color="primary"
        (click)="action('close')"
      >
        Volver
      </button>
    </mat-toolbar>

    <div id="container">
      <mat-card *ngIf="congrat" class="margintop">
        <div class="margin">
          <h2 class="" *ngIf="lastSigning">Tu último fichaje:</h2>
           <h4 *ngIf="!lastSigning">Aún no has registrado ningún fichaje</h4> 
          <div class="title" *ngIf="lastSigning">
            <div>Fecha: {{ dateFormat(lastSigning?.fecha) }}</div>
            <div>Tipo: {{ labels(lastSigning?.codTipoFichaje) }}</div>
            <div>Dispositivo: {{ device?.descripcion }}</div>
          </div>
        
        </div>
        <mat-divider></mat-divider>
        <div class="marginb">
          <h2 class="">¿Qué quieres hacer?</h2>

          <div *ngIf="!visible" class="buttons marginb">
            <mat-radio-button
              class=""
              *ngFor="let item of type"
              [value]="item"
              [disabled]="disableButton(item)"
              (change)="changeRadio(item)"
              >{{ labels(item) }}</mat-radio-button
            >
          </div>

          <div class="marginb rdo" *ngIf="visible">
            <mat-radio-button
              class=""
              *ngFor="let item of permits"
              [value]="item"
              (change)="changeRadioPermit(item)"
              >{{ labels(item) }}</mat-radio-button
            >
          </div>
          <div class="cntr">
            <button
              *ngIf="!visible"
              class="button"
              [disabled]="disabled"
              mat-raised-button
              color="primary"
              (click)="action(sign)"
            >
              Notificar
            </button>
            <button
              *ngIf="visible"
              class="button"
              [disabled]="disables"
              mat-raised-button
              color="primary"
              (click)="action(permit)"
            >
              Notificar
            </button>
          </div>
        </div>
      </mat-card>

      <mat-card *ngIf="!congrat" class="margintop">
        <div class="margin">
          <h1 >Felicidades {{ this.service.user?.nombre }}</h1>
          <mat-divider></mat-divider>
          <h2 class="margintop">Tu fichaje registrado es:</h2>
          <div class="title">
            <div>Fecha: {{ dateFormat(newSign?.fecha) }}</div>
            <div>Tipo:{{ labels(newSign?.codTipoFichaje) }}</div>
            <div>Dispositivo: {{ device?.descripcion }}</div>
          </div>
        </div>
      </mat-card>
    </div>
  `,
  styles: [
    `
    .margintop{
      margin-top: 40px;
    }
      .title {
        display: flex;
        flex-wrap: wrap;
        padding: 2.5%;
        justify-content: space-between;
      }

      .title div {
        margin: 10px;
        flex: 200px;
      }

      .rdo {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: row;
      }

      .rdo mat-radio-button {
        flex-basis: 200px;
        margin: 10px;
      }

      .buttons mat-radio-button {
        margin: 10px;
      }

      .margin {
        padding: 0px 0px 30px 0px;
      }

      .marginb {
        padding: 15px 0px;
      }

      mat-card {
        //margin-top: 30px;
        padding: 40px;
      }

      .bar {
        display: flex;
        justify-content: space-between;
      }

      :host {
        position: relative;
      }

      a,
      radiobutton {
        cursor: pointer;
      }

      #container {
        width: 55%;
        margin: auto;
      }

      table {
        width: 70%;
      }

      .buttons {
        display: flex;
        justify-content: space-around;
        width: 100%;
      }

      .cntr {
        justify-content: center;
        display: flex;
      }

      @media (max-width: 600px) {
        .buttons {
          flex-wrap: wrap;
        }

        mat-card {
          padding: 16px;
        }

        .buttons button {
          width: 100%;
          margin-bottom: 1rem;
        }
        .button {
          width: 100%;
        }

        #container {
          width: 100%;
        }

        a {
          position: absolute;
          right: 0px;
        }

        .mat-radio-button {
          width: 100%;
        }

        #container > div: {
          display: flex;
          justify-content: space-around;
          width: 100%;
          flex-wrap: wrap;
        }
      }
    `,
  ],
})
export class SigningComponent implements OnInit {
  permits: string[] = ["L1", "L2", "L3", "L4"];
  type: string[] = ["ENT", "SAL", "STE"];
  visible: boolean = false;
  disables: boolean = true;
  disabled: boolean = true;
  congrat: boolean = true;
  permit: string;
  sign: string;
  lastSigning: Signing;
  newSign = {} as Signing;
  device: Device;

  constructor(
    public service: SigningService,
    public auth: AuthenticationService
  ) {}

  changeRadioPermit(value: string) {
    this.disables = false;
    this.permit = value;
  }
  changeRadio(value: string) {
    this.disabled = false;
    this.sign = value;
  }
  action(evt) {
    if (evt === "permiso") {
      this.visible = true;
      this.congrat = true;
    } else if (evt === "close") {
      this.visible = false;
      this.congrat = true;
    } else if (evt !== "") {
      navigator.geolocation.getCurrentPosition((x) => {
        this.newSign.latitud = x.coords.latitude.toString();
        this.newSign.longitud = x.coords.longitude.toString();
      });
      this.newSign.estado = "A";
      this.newSign.codTipoFichaje = evt;
      this.newSign.fecha = new Date();
      this.newSign.codEmpleado = this.service.user.empleadoId;

      this.newSign.idDispositivo = this.service.client.centros
        .find((x) => x.idCentro === this.service.user.centro.idCentro)
        .dispositivos.find((x) => x.codTipoDispositivo === 14).idDispositivo;
      console.log(this.newSign);
      this.congrat = false;

      this.service.postSignings(this.newSign).then((x) => {
        console.log(x);
        this.lastSigning = this.newSign;
      });
    }
  }
  disableButton(item: string): boolean {
    if (this.lastSigning?.codTipoFichaje === item) {
      return true;
    } else {
      switch (this.lastSigning?.codTipoFichaje) {
        case "SAL":
          if (item === "STE") {
            return true;
          }
      }
    }
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
        return "Deber inexcusable público y personal";
    }
  }

  dateFormat(date){
    return moment(date).format('DD/MM/YYYY, hh:mm:ss');
  }

  ngOnInit() {
    this.lastSigning = this.service.user?.fichajes[
      this.service.user?.fichajes.length - 1
    ];

    this.device = this.service.center.dispositivos.find(
      (z) => z.idDispositivo === this.lastSigning.idDispositivo
    );
  }
}
