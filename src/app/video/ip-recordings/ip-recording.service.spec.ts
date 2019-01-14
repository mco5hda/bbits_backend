import { TestBed } from '@angular/core/testing';

import { IpRecordingService } from './ip-recording.service';

describe('IpRecordingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpRecordingService = TestBed.get(IpRecordingService);
    expect(service).toBeTruthy();
  });
});
