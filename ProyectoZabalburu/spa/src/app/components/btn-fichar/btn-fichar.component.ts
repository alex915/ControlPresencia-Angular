import { Component, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../../Services/auth.service';

@Component({
  selector: 'app-btn-fichar',
  template: `
       <button *ngIf="this.serviceAuth.getUserProfile().roles[0] === 'Admin'||this.serviceAuth.getUserProfile().roles[0] === 'User'"
      class="disab"
        mat-fab
        #tooltip="matTooltip"
        matTooltip="Nuevo Fichaje"
        [matTooltipPosition]="position.value"
        matTooltipHideDelay="1000"
        color="primary"
        id="btn"
        routerLink="/signing"
      >
        +
      </button>
  `,
    styles: [
        `
 #btn {
        position: fixed;
        bottom: 0;
        right: 0;
        margin: 30px;
        z-index: 100;
      }

 @media (min-width: 900px) {
      .disab{
        display:none;
      }
    }
`
  ]
})
export class BtnFicharComponent implements OnInit {
    positionOptions: TooltipPosition[] = ["below", "above", "left", "right"];
    position = new FormControl(this.positionOptions[0]);
    constructor(public serviceAuth: AuthenticationService) { }

  ngOnInit(): void {
  }

}
