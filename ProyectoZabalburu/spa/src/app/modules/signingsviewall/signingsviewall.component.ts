import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-signingsviewall",
    template: ` <app-signings [id]="this.aroute.snapshot.paramMap.get('id')" [own]=false></app-signings> <app-btn-fichar></app-btn-fichar> `,
  styles: [],
})
export class SigningsviewallComponent implements OnInit {
  id:string = null;
  constructor(public aroute:ActivatedRoute) {
    
  }

  ngOnInit(): void {
  }
}
