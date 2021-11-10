import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { from, interval, NEVER, Observable, of, Subject } from 'rxjs';
import { concatMap, delay, take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

import { MockingStrategyComponent } from './mocking-strategy.component';

describe('MockingStrategyComponent', () => {
  let component: MockingStrategyComponent;
  let fixture: ComponentFixture<MockingStrategyComponent>;

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockingStrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockingStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 6 stopni mockowania SIX STEPS MOCKING STRATEGY

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // NEVER  - zadna wartosc 
  it('should do something', () => {
    component.users$ = NEVER
    component.ngOnInit();
    expect(component.users).toEqual([]);

  });
  

  // OF  - 1 wartość, synchroniczna 
  it('should do something', () => {
    component.users$ = of('lol');
    component.ngOnInit();
    expect(component.users).toEqual(['lol']);

  });

  // OF + DELAY - 1 wartość, asynchonicznie
  it('should do something', fakeAsync(() => {
    component.users$ = of('Maria', 'Roman', 'Hans')
    .pipe(
      concatMap(x => of(x)
      .pipe(
        delay(20)
      ))
    );
    component.ngOnInit();
    tick(60)

    expect(component.users).toEqual(['Maria', 'Roman', 'Hans'])
  }));

  // FROM wiele wartości synchonicznie
  it('should do something', () => {
    component.users$ = from(['Maria', 'Roman', 'Hans'])
    .pipe(
      concatMap(x => of(x))
    );
    component.ngOnInit();
    expect(component.users).toEqual(['Maria', 'Roman', 'Hans']);
  });

  // INTERVAL wiele wartości asynchonicznie
  it('should do something INTERVAL', fakeAsync(() => {
    // testScheduler.run(()=> {
      const users = ['Maria', 'Roman', 'Hans']
      component.users$ = interval(1000).pipe(
        take(3),
        concatMap(event => of(users[event]))
      );
      
      component.ngOnInit();
      tick(10000)
      expect(component.users).toEqual(['Maria', 'Roman', 'Hans']);
    // })
  }));

  // SUBJECT for flexibility 
  it('should do something', fakeAsync(() => {
    const sub: Subject<string> = new Subject();
    const obs: Observable<string> = sub.asObservable();

    component.users$ = obs;
    component.ngOnInit();
    tick(10)
    sub.next('Maria');

    tick(10000)
    sub.next('Roman');

    tick(2)
    sub.next('Hans');

    expect(component.users).toEqual(['Maria', 'Roman', 'Hans']);

  }));





// mokowanie za pomoca marble

  // interval marble
  it('should do something INTERVAL marble', () => {
    testScheduler.run(runHelpers => {
      const { cold, flush } = runHelpers;

      component.users$ = cold('-a-b-|c', {
        a: 'Maria', 
        b: 'Roman', 
        c: 'Hans'
      });
      
      component.ngOnInit();
      flush();
      expect(component.users).toEqual(['Maria', 'Roman']);
    })
  });


  // SUBJECT for flexibility 
  it('should do something SUBJECT marble', fakeAsync(() => {

    testScheduler.run(runHelpers => {
      const { cold, flush } = runHelpers;

      component.users$ = cold('20ms a 19ms b 19ms (c|)', {
        a: 'Maria', 
        b: 'Roman', 
        c: 'Hans'
      });
      
      component.ngOnInit();
      flush();
      expect(component.users).toEqual(['Maria', 'Roman', 'Hans']);
    })

  }));

  // jeszcze dodać testowanie observable i testowanie subskrybcji

});
