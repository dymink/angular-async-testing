import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';

import { MarblesComponent } from './marbles.component';

describe('MarblesComponent', () => {
  let component: MarblesComponent;
  let fixture: ComponentFixture<MarblesComponent>;

  const testScheduler = new TestScheduler((actual, expected) => {
    // console.log(actual, expected)  <--  [PRO TIP] tutaj mozna sprawdzić kiedy przychodz  wartosci
    expect(actual).toEqual(expected)
  })

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
});
