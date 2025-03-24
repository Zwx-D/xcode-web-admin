import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendAccountComponent } from './backend-account.component';

describe('BackendAccountComponent', () => {
  let component: BackendAccountComponent;
  let fixture: ComponentFixture<BackendAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
