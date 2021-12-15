
import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  readonly uri: string = "ws://localhost:4200"; //set url for the socketservice to connect to


  constructor() {
    this.socket = io(this.uri); //creates new socketService @url
  }

  listen(eventName: string) { //listen function, takes eventname and creates a new observable from the subscriber
                              // , then links subscriber with next data set from server
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data:any) => {
        subscriber.next(data);
      })
    })
  }
}
