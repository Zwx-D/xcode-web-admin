import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WxAccountComponent } from './wx-account.component';

describe('WxAccountComponent', () => {
  let component: WxAccountComponent;
  let fixture: ComponentFixture<WxAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WxAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WxAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
