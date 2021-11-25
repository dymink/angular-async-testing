import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-loop',
  templateUrl: './event-loop.component.html',
  styleUrls: ['./event-loop.component.scss']
})
export class EventLoopComponent implements OnInit {

  numbers: number[] = []

  constructor() { }

  ngOnInit(): void {
    this.example();
  }

  push(number: number){
    this.numbers.push(number)
  }

  example(){
    this.push(1) // MakroTask

    setTimeout(()=> {this.push(2)}, 0); // next MakroTask  

    Promise.resolve().then(
      () => {
        this.push(3)
      } 
    ) // Mikrotask

    requestAnimationFrame(()=> {
      this.push(4);
    });

    // 1 3 4 2 

    // Safari
    // 1 3 2 4


    // https://css-tricks.com/using-requestanimationframe/
  }

}
