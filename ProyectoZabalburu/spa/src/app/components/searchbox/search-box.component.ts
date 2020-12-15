import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SigningService } from 'src/app/Services/signing.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'searchbox',
  template: `
  <div class="form-inline d-flex justify-content-center flex-nowrap md-form form-sm mt-0">
  <fa-icon [icon]="faSearch" aria-hidden="true"></fa-icon>
  <input class="form-control form-control mx-2 w-75" [(ngModel)]="searchText" type="text" placeholder="Buscar {{type}}..."
    aria-label="Buscar"/>
  <button type="button" (click)="changeText()" [disabled]="searchText === ''" class="btn btn-info mr-4">Buscar</button>

</div>
  `,
  styles: [
    `
    input{
      padding-left:2.3rem;
    }
    fa-icon{
      left: 2.3rem;
      position: relative;
      }
    `
  ]
})
export class SearchBoxComponent {
    public searchText: string = '';
    public resultado: any;

  @Output() emitter = new EventEmitter<string>();
  faSearch = faSearch;
    @Input() type: string;

    constructor(public service:SigningService) {
    }

  public async changeText(): Promise<void>  {
      this.emitter.emit(this.searchText);
     
  }

}
