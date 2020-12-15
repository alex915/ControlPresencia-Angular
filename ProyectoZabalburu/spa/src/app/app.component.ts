import { Component } from "@angular/core";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-root",
  template: `
   <ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "medium" color = "#ffd740" type = "line-scale" [fullScreen] = "true"></ngx-spinner>

   <!-- <app-header></app-header>-->
   <app-main-nav></app-main-nav>
   
   
  `,
  styles: [],
})
export class AppComponent {
  title = "Fichajes";
  constructor(private spinner: NgxSpinnerService) {
    //this.spinner.show();
  }
}
