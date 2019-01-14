import { TestBed } from '@angular/core/testing';

import { IpCameraService } from './ip-camera.service';

describe('IpCameraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpCameraService = TestBed.get(IpCameraService);
    expect(service).toBeTruthy();
  });
});
