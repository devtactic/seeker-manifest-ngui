import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionLabelComponent } from './vision-label.component';

describe('VisionLabelComponent', () => {
  let component: VisionLabelComponent;
  let fixture: ComponentFixture<VisionLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
