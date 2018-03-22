import { TestBed, inject } from '@angular/core/testing';

import { VisionKeepaliveService } from './vision-keepalive.service';

describe('VisionKeepaliveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisionKeepaliveService]
    });
  });

  it('should be created', inject([VisionKeepaliveService], (service: VisionKeepaliveService) => {
    expect(service).toBeTruthy();
  }));
});
