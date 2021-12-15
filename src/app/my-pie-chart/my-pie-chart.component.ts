import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { SocketService } from 'C:/Users/defor/ngchart/src/app/socket.service';

@Component({
  selector: 'app-my-pie-chart',
  templateUrl: './my-pie-chart.component.html',
  styleUrls: ['./my-pie-chart.component.css']
})
export class MyPieChartComponent implements OnInit {

  public pieChartLabels = ['KCEC', 'KCNC-TV', 'KDEN-DT', 'KDVR-DT', 'KMGH-TV', 'KTVD-DT', 'KUSA-HD', 'KWGN-DT']; //set pieChartLabels
  public pieChartType: ChartType = 'pie';                   //set ChartType to pie
  public pieChartData = [1,1,25,2,19,0,0,0]; // filler data

  constructor(private SocketService: SocketService) { }

  update(data: any) { //convert data to an array of number

    data = data as number[];
    return data;
  }

  ngOnInit(): void {

    this.SocketService.listen('dataupdate').subscribe((data) => { //listens for a dataupdate call on the socketService, subscribes the listener to data from server,
      console.log(data);                                          //than return the data, and sets the subscriber to recieve next set of data
      this.pieChartData = this.update(data);                       //updates the chart with new data from the subscriber 

    });

  }

}
