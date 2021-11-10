import { ComponentFixture, TestBed } from '@angular/core/testing';

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

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularTestUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
