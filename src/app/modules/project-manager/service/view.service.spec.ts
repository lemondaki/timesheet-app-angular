import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewService } from './view.service';

describe('ViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViewService],
    });
  });

  it('should be created', inject([ViewService], (service: ViewService) => {
    expect(service).toBeTruthy();
  }));
});
