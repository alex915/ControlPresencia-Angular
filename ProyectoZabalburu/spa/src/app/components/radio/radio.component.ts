import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'radiobutton',
  template: `
  <input [id]="value" name="radio" type="radio" [disabled]="disabled" [value]="value" (change)="change(value)"/>
  <label [for]="value" class="ml-1">{{label}}</label>
  `,
  styles: [
  ]
})
export class RadioComponent implements OnInit {
  @Input() value:string;
  @Input() label:string;
  @Input() disabled:boolean = false;
  @Output() changeRadio = new EventEmitter<string>();
  constructor() { }
change(value:string){
  this.changeRadio.emit(value);
}

  ngOnInit(): void {

  }
}
