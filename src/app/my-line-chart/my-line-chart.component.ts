import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { SocketService } from 'C:/Users/defor/ngchart/src/app/socket.service';

@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.css']
})
export class MyLineChartComponent implements OnInit {

  public lineChartLabels = ['Nov', 'Dec', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']; //set lineChartLabel
  public lineChartTitle = 'Errors by Month';

  public lineChartType: ChartType = 'line'; //set chartType
  public lineChartData = [197, 2594, 948, 2286, 2901, 761, 489, 787, 794, 685, 34, 9]; //set linechartdata

  constructor(private SocketService: SocketService) { }

  update(data: any) {  //convert data into an array of number

    data = data as number[];
    return data;
  }


  ngOnInit(): void {

    this.SocketService.listen('dataupdate').subscribe((data) => { //listens for a dataupdate call on the socketService, subscribes the listener to data from server, 
      console.log(data);                                          //than return the data, and sets the subscriber to recieve next set of data
      this.lineChartData = this.update(data);                      //updates the chart with new data from the subscriber 
      
    });

  }

}


  

