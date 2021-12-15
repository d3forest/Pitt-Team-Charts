import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { SocketService } from 'C:/Users/defor/ngchart/src/app/socket.service';


@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css']
})
export class MyBarChartComponent implements OnInit { 

  public barChartOptions = { //set barChartOptions
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['KCEC', 'KCNC-TV', 'KDEN-DT', 'KDVR-DT', 'KMGH-TV', 'KTVD-DT', 'KUSA-HD', 'KWGN-DT']; //barchart label
  public barChartType: ChartType = 'bar'; //set chart type
  public barChartLegend = true;

  public sample = [52, 1568, 2572, 2361, 4344, 19, 191, 1378];// filler data

  public barChartData = [
    { data: this.sample, label: 'Errors by Station' } //set barchartdata

  ];

  constructor(private SocketService: SocketService) {} 

  update(data: any) { //convert data into an array of number

    data = data as number[];
    return data;
  }
  

  ngOnInit() {

    this.SocketService.listen('dataupdate').subscribe((data) => { //listens for a dataupdate call on the socketService, subscribes the listener to data from server, 
      console.log(data);                                          //than return the data, and sets the subscriber to recieve next set of data
      this.sample = this.update(data);
      this.barChartData = [ 
        { data: this.sample, label: 'Errors by Station' }  //updates the chart with new data from the subscriber 

      ];
    });

  }

}
