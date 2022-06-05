import { TestBed } from '@angular/core/testing';

import { HistorialAgendaService } from './historial-agenda.service';

describe('HistorialAgendaService', () => {
  let service: HistorialAgendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialAgendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
