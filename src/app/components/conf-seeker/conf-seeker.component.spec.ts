import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfSeekerComponent } from './conf-seeker.component';

describe('ConfSeekerComponent', () => {
  let component: ConfSeekerComponent;
  let fixture: ComponentFixture<ConfSeekerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfSeekerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
