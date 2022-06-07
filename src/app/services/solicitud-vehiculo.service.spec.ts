import { TestBed } from '@angular/core/testing';

import { SolicitudVehiculoService } from './solicitud-vehiculo.service';

describe('SolicitudVehiculoService', () => {
  let service: SolicitudVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
