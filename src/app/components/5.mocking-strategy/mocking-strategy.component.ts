import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-mocking-strategy',
  templateUrl: './mocking-strategy.component.html',
  styleUrls: ['./mocking-strategy.component.scss']
})
export class MockingStrategyComponent implements OnInit {

  users$ = of('Maria', 'Roman', 'Hans')
  .pipe(
    concatMap(x => of(x)
    .pipe(
      delay(20)
    ))
  )

  users: string[] = []

  ngOnInit(): void {
    this.users$.subscribe(name => {
      this.users.push(name)
    })
  }

}
