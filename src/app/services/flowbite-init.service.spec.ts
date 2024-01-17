import { TestBed } from '@angular/core/testing';

import { FlowbiteInitService } from './flowbite-init.service';

describe('FlowbiteInitService', () => {
  let service: FlowbiteInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowbiteInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
