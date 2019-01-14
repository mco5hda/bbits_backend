import { TestBed } from '@angular/core/testing';

import { AnalogRecordingService } from './analog-recording.service';

describe('AnalogRecordingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalogRecordingService = TestBed.get(AnalogRecordingService);
    expect(service).toBeTruthy();
  });
});
