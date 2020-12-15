import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar',
  template:`<div style="display: relative; height: 40vh">
  <canvas baseChart
    [datasets]="dataset"
    [labels]="label"
    [options]="barChartOptions"
    [plugins]="barChartPlugins"
    [legend]="barChartLegend"
    [chartType]="barChartType">
  </canvas>
</div>
`,
  styles: [
  ]
})
export class BarComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: .5,
    legend: {
      labels: {
        fontColor:'#ddd',
        usePointStyle: true,
        padding: 20, 
      }
    },
    scales: {
      
      xAxes: [{
        
        ticks: {
          padding: 10,
          fontColor:'#ddd',
          minRotation: 70
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
  @Input() public label: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors = [
    {
      borderColor: '',
      backgroundColor: ['#ffd740', '#ffc300', '#ffab00', '#cc9c00'],
    },{
      borderColor: '',
      backgroundColor: ['#ffd740', '#ffc300', '#ffab00', '#cc9c00'],
    },{
      borderColor: '',
      backgroundColor: ['#ffd740', '#ffc300', '#ffab00', '#cc9c00'],
    },{
      borderColor: '',
      backgroundColor: ['#ffd740', '#ffc300', '#ffab00', '#cc9c00'],
    },
  ];
  @Input() public dataset: ChartDataSets[];

  constructor() { }

  ngOnInit() {
  }

}
