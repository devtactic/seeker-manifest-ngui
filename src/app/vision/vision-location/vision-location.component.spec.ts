import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionLocationComponent } from './vision-location.component';

describe('VisionLocationComponent', () => {
  let component: VisionLocationComponent;
  let fixture: ComponentFixture<VisionLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
