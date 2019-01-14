import { TestBed } from '@angular/core/testing';

import { AnalogCameraService } from './analog-camera.service';

describe('AnalogCameraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalogCameraService = TestBed.get(AnalogCameraService);
    expect(service).toBeTruthy();
  });
});
