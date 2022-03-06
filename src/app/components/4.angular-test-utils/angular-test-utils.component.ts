import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-angular-test-utils',
  templateUrl: './angular-test-utils.component.html',
  styleUrls: ['./angular-test-utils.component.scss']
})
export class AngularTestUtilsComponent implements OnInit {

  colors = ['red', 'green', 'black'];
  color: string = 'green';

  selected$ = of(...this.colors)
  .pipe(
    concatMap(x => {
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
