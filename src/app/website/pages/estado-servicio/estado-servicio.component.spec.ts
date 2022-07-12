import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoServicioComponent } from './estado-servicio.component';

describe('EstadoServicioComponent', () => {
  let component: EstadoServicioComponent;
  let fixture: ComponentFixture<EstadoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
