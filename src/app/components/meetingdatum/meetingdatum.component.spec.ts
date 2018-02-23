import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingdatumComponent } from './meetingdatum.component';

describe('MeetingdatumComponent', () => {
  let component: MeetingdatumComponent;
  let fixture: ComponentFixture<MeetingdatumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingdatumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingdatumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
