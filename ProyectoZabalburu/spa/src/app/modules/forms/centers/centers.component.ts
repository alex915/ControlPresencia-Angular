import { Component, OnInit } from "@angular/core";
import { Center } from "src/app/models/center";
import { SigningService } from "src/app/Services/signing.service";
import { Router } from "@angular/router";

@Component({
  selector: "new-centers",
  template: `
    <mat-toolbar class="bar">
      <div>
        <span>Crear Centro</span>
      </div>
      <button mat-raised-button color="primary" routerLink="/centers">
        Volver
      </button>
    </mat-toolbar>

    <mat-card>
      <app-center-form #Center [client]="this.service.client?.codigoCliente">
      </app-center-form>
      <div class="center">
        <button [disabled]="Center.centerform.invalid" mat-button (click)="log(Center)" id="btnCrear">
          Crear Centro
        </button>
      </div>
    </mat-card>
  `,
  styles: [
    `

      #btnCrear{

        margin-top:30px
        }
      @media (max-width: 900px) {
        .center {
          display: flex;
          justify-content: center;
          margin:10px;
        }
      }
      @media (min-width: 900px) {
        .center {
          display: flex;
          justify-content: flex-end;
          margin:10px;

        }
      }
    
       mat-card {
        margin: 20px 16px;
      }
      .bar {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class CentersComponent implements OnInit {
  center: Center;
  constructor(public service: SigningService, public router: Router) {}

  ngOnInit(): void {}

  log(evt) {
    if (evt.centerform != undefined) {
        this.center = evt.centerform.value;
        console.log(this.center);
        console.log(this.service.client.centros);
        this.center.estado = "A";
        this.center.codCliente = this.service.client.idCliente;
        console.log(this.center);
        this.service.postCenters(this.center).then(x => this.router.navigate(["/centers"]).then(x=>window.location.reload()));
        
        this.service.getAllCenters().then(x => console.log(x));
        
    }
    
  }
}
