import { TestBed, ComponentFixture, waitForAsync, fakeAsync, tick, flush} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NEVER, of } from 'rxjs';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { concatMap, delay } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing'
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
  })

  const time = testScheduler.createTime('--|')

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({declarations: [AppComponent]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
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


  it('should do something', () => {
    testScheduler.run((helpers: RunHelpers) => {
      const { expectObservable } = helpers;

      expectObservable(component.selected$).toBe('20ms a 19ms b 19ms (c|)', {a: 'red', b: 'green', c: 'black'});
    })
  })

  // NEVER
  it('should do something', () => {
    component.selected$ = NEVER;
    component.ngOnInit();
    expect(component.color).toBe('red');

  })
  
});
