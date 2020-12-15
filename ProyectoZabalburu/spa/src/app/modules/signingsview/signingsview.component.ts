import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { SigningService } from "src/app/Services/signing.service";

@Component({
  selector: "app-signingsview",
  template: `
  
      <app-signings [own]="true"></app-signings>
<app-btn-fichar></app-btn-fichar>

  `,
  styles: [
    `
      .app-signigs {
        display: none;
      }
    `,
  ],
})
export class SigningsviewComponent implements OnInit {
  constructor(public service: SigningService) {}

  ngOnInit(): void {}
}
