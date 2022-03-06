import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';

import { MarblesComponent } from './marbles.component';
import { tap } from 'rxjs/operators';

describe('MarblesComponent', () => {
  let component: MarblesComponent;
  let fixture: ComponentFixture<MarblesComponent>;


  const testShedulerCallback = (actual: string, expected: string) => {
    console.log(actual, expected)  // <--  [PRO TIP] tutaj mozna sprawdzić kiedy przychodz  wartosci
    expect(actual).toEqual(expected)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 4 sposoby uzywania Marbles
  // TestShedular manualnie - stara metoda
  // biblioteka jasmine-marbles
  // biblioteka rx marbles
  // TestShedular = nowa metoda run dostepna od wersji 6

  it('should emit proper value - marbles mocked with hot helper method', () => {
    const testScheduler = new TestScheduler(testShedulerCallback) 
    testScheduler.run((helpers: RunHelpers) => {
      const { cold, hot, expectObservable, expectSubscriptions, flush} = helpers;
      const source = hot('---a--b--c|', { a: 'red', b: 'green', c: 'black'});
      const expected = '---a--b--c|';
      const expectedValues = { a: 'red', b: 'green', c: 'black'}
      component.selected$ = source;

      expectObservable(component.selected$).toBe(expected, expectedValues);
    })
  })

  it('should emit proper value - marbles mocked with cold helper method', () => {
    const testScheduler = new TestScheduler(testShedulerCallback)
    testScheduler.run((helpers: RunHelpers) => {
      const { cold, hot, expectObservable, expectSubscriptions, flush} = helpers;
      const source = cold('---a--b--c|', { a: 'red', b: 'green', c: 'black'});
      const expected = '---a--b--c|';
      const expectedValues = { a: 'red', b: 'green', c: 'black'}
      component.selected$ = source;

      expectObservable(component.selected$, '^').toBe(expected, expectedValues);
    })
  })


  it('should emit proper value - marbles new time progression syntax', () => {
    const testScheduler = new TestScheduler(testShedulerCallback)
    testScheduler.run((helpers: RunHelpers) => {
      const { cold, hot, expectObservable, expectSubscriptions, flush} = helpers;

      expectObservable(component.selected$).toBe('20ms a 19ms b 19ms (c|)', { a: 'red', b: 'green', c: 'black'})

    })
  })

  it('should emit proper value - marbles flush usage example', () => {
    const testScheduler = new TestScheduler(testShedulerCallback)
    testScheduler.run((helpers: RunHelpers) => {
      const { cold, hot, expectObservable, expectSubscriptions, flush} = helpers;

      let eventCount = 0;

      const s1 = cold('--a--b|', {a: 'x', b: 'y'});

      const result = s1.pipe(tap(()=> eventCount++));

      expectObservable(result).toBe('--a--b|', {a: 'x', b: 'y'});

      flush();

      expect(eventCount).toBe(2);

    })
  })


});
