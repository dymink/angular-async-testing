import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { TestScheduler } from 'rxjs/testing';

import { AngularTestUtilsComponent } from './angular-test-utils.component';

describe('AngularTestUtilsComponent', () => {
  let component: AngularTestUtilsComponent;
  let fixture: ComponentFixture<AngularTestUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularTestUtilsComponent ]
    })
    .compileComponents();
  });

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
  })

  const time = testScheduler.createTime('--|')

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularTestUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should time frame be 20 like in configuration', () => {
    expect(time).toEqual(20);
  })

  it('should log proper colors -  FakeAsync', fakeAsync(() => {
    const consoleSpy = spyOn(console, 'log')
    component.ngOnInit()
    tick(20)
    expect(consoleSpy).toHaveBeenCalledWith('red')
    tick(20)
    expect(consoleSpy).toHaveBeenCalledWith('green')
    tick(20)
    expect(consoleSpy).toHaveBeenCalledWith('black')

    // trzeba do konca doprowadzic observable bo inaczej bład 
  }))

  it('should test some asynchronous code', fakeAsync(() => {
    let flag = false;
    Promise.resolve(true).then((result) => {
      flag = true;
    });
    flushMicrotasks();
    expect(flag).toBe(true); // PASSES
  }));

  it('should log proper colors - waitForAsync', waitForAsync(() => {
    const consoleSpy = spyOn(console, 'log')
    component.ngOnInit()

    fixture.whenStable().then(()=>{
      expect(consoleSpy).toHaveBeenCalledWith('red')
      expect(consoleSpy).toHaveBeenCalledWith('green')
      expect(consoleSpy).toHaveBeenCalledWith('black')
    });
    // trzeba do konca doprowadzic observable bo inaczej bład 

  }))

  it('should log proper colors - jasmine done', (done) => {
    const result: string[] = [];

    component.selected$.subscribe({
        next: (value) => {
          result.push(value);
        },
        complete: () => {
          expect(result).toEqual(['red', 'green', 'black']);
          done();
        }
    })

  })

  it('marble test', () => {
    testScheduler.run((helpers: RunHelpers) => {
      const { expectObservable } = helpers;

      expectObservable(component.selected$).toBe('20ms a 19ms b 19ms (c|)', {a: 'red', b: 'green', c: 'black'});
    })
  })
});
