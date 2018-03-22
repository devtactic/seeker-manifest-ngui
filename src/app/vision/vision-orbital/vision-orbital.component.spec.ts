import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionOrbitalComponent } from './vision-orbital.component';

describe('VisionOrbitalComponent', () => {
  let component: VisionOrbitalComponent;
  let fixture: ComponentFixture<VisionOrbitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionOrbitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionOrbitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
