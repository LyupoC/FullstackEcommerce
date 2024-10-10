import { TestBed } from '@angular/core/testing';

import { ModalDialogsService } from './modal-dialogs.service';

describe('ModalDialogsService', () => {
  let service: ModalDialogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalDialogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
