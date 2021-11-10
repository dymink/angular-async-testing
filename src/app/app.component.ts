import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { concatMap, delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  colors = ['red', 'green', 'black'];
  color: string = 'green';

  selected$ = of(...this.colors)
  .pipe(
    concatMap(x => {
      // console.log(x)
      return of(x)
    .pipe(
      delay(20)
    )})
  )

  ngOnInit(){
    this.selected$.subscribe(e => console.log(e));
    this.color = 'red'
  }
}
