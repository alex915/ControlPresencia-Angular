import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, Color } from 'ng2-charts';
import { constants } from 'src/colors';

@Component({
  selector: 'app-pie',
  template:`
  <div style="display: relative; height: 40vh;">
  <canvas baseChart
    [data]="dataset"
    [labels]="labels"
    [chartType]="pieChartType"
    [colors]="pieChartColors"
    [options]="pieChartOptions"
    [plugins]="pieChartPlugins"
    [legend]="pieChartLegend">
  </canvas>
</div>
`,
  styles: [
  ]
})
export class PieComponent implements OnInit {
 
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: .5,
    legend: {
      position: "left",
      align: "start",
      labels: {
        usePointStyle: true,
        padding: 20, 
        fontColor:'#ddd', 
      }
  }
  };
  @Input() public labels: Label[];
  @Input() public dataset: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Color[] = [
    {
      borderWidth: 0,
      backgroundColor: constants.colors,
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
