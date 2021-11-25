import { concatMap, delay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-marbles',
  templateUrl: './marbles.component.html',
  styleUrls: ['./marbles.component.scss']
})
export class MarblesComponent implements OnInit {

  colors = ['red', 'green', 'black'];
  color: string = 'green';

  selected$ = of(...this.colors)
  .pipe(
    concatMap(x => {
      return of(x)
      .pipe(
        delay(20)
      )
    })
  )

  ngOnInit(): void {
    this.selected$.subscribe(e => console.log(e));
    this.color = 'red';
  }

}
