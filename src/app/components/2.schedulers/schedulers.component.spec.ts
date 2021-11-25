import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick, flush } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';

import { SchedulersComponent } from './schedulers.component';

describe('SchedulersComponent', () => {
  let component: SchedulersComponent;
  let fixture: ComponentFixture<SchedulersComponent>;

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
