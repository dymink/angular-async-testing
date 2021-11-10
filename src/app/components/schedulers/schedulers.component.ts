import { Component, OnInit } from '@angular/core';
import { asapScheduler, asyncScheduler, merge, of, queueScheduler, scheduled } from 'rxjs';
import { mergeAll, observeOn } from 'rxjs/operators';

@Component({
  selector: 'app-schedulers',
  templateUrl: './schedulers.component.html',
  styleUrls: ['./schedulers.component.scss']
})
export class SchedulersComponent implements OnInit {

  numbers: number[] = []

  push(number: number){
    this.numbers.push(number)
  }

  constructor() { }

  ngOnInit(): void {
    this.example();
  }

  example(){
    
  // RXJS 6.5 < DEPRECATED!
  // https://rxjs.dev/deprecations/scheduler-argument

  merge(
    of(1),
    of(2, asyncScheduler),
    of(3, asapScheduler)
  ).subscribe(v => this.push(v))
    
  // 1 3 2

    // animationFrameScheduler
  }

  // Scheduler Types

  // null

  // queueScheduler
  //https://stackoverflow.com/questions/49996986/rxjs-what-difference-with-scheduler-queue-and-null
  // https://blog.cloudboost.io/so-how-does-rx-js-queuescheduler-actually-work-188c1b46526e
  //

  // asapScheduler

  // asyncScheduler

  // animationFrameScheduler
}
