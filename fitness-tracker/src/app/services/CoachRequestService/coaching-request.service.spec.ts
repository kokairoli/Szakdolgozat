import { TestBed } from '@angular/core/testing';

import { CoachingRequestService } from './coaching-request.service';

describe('CoachingRequestService', () => {
  let service: CoachingRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachingRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
