import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSolicitudVehiculoComponent } from './tabla-solicitud-vehiculo.component';

describe('TablaSolicitudVehiculoComponent', () => {
  let component: TablaSolicitudVehiculoComponent;
  let fixture: ComponentFixture<TablaSolicitudVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSolicitudVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSolicitudVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
