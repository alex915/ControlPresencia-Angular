import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line',
  template: `<div class="" style="display: relative; height: 40vh">
  <canvas baseChart width="100%"
    [datasets]="data"
    [labels]="labels"
    [options]="lineChartOptions"
    [colors]="lineChartColors"
    [legend]="lineChartLegend"
    [chartType]="lineChartType"
    [plugins]="lineChartPlugins">
  </canvas>
</div>
`,
  styles: [
    `
    `
  ]
})
export class LineComponent implements OnInit {

 @Input()  public data: ChartDataSets[] = [];
  @Input() public labels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: .5,
    legend: {
      labels: {
        fontColor:'#ddd', 
        usePointStyle: true,
        padding: 20, 
      },
    },
    scales: {
      
      xAxes: [{
        
        ticks: {
          padding: 10,
          fontColor:'#ddd',
        },
          gridLines: {
            display: false,
              offsetGridLines: true,
              zeroLineColor:'#ddd',
              zeroLineWidth: .5,
              lineWidth: .5,
          },
      }],
      yAxes:[{
        ticks: {
          padding: 10,
          fontColor:'#ddd',
        },
        gridLines: {
            color: '#ddd',
            zeroLineColor:'#ddd',
            zeroLineWidth: .5,
            lineWidth: .5
        }
    }], 
  }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '',

    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }

}
