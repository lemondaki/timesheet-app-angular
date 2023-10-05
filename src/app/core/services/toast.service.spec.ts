import { TestBed, inject } from '@angular/core/testing';

import { toastService } from './toast.service';

describe('toastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [toastService],
    });
  });

  it('should be created', inject([toastService], (service: toastService) => {
    expect(service).toBeTruthy();
  }));
});
