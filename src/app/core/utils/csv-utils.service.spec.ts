import { TestBed, inject } from '@angular/core/testing';

import { CsvUtilsService } from './csv-utils.service';

describe('CsvUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsvUtilsService]
    });
  });

  it('should be created', inject([CsvUtilsService], (service: CsvUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
