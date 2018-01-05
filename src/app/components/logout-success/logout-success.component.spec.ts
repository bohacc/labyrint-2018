import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutSuccessComponent } from './logout-success.component';

describe('LogoutSuccessComponent', () => {
  let component: LogoutSuccessComponent;
  let fixture: ComponentFixture<LogoutSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
