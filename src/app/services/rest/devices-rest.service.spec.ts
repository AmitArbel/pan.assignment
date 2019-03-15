import { TestBed } from '@angular/core/testing';

import { DevicesRestService } from './devices-rest.service';

describe('DevicesRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevicesRestService = TestBed.get(DevicesRestService);
    expect(service).toBeTruthy();
  });
});
