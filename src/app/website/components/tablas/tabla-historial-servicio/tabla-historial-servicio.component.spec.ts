import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHistorialServicioComponent } from './tabla-historial-servicio.component';

describe('TablaHistorialServicioComponent', () => {
  let component: TablaHistorialServicioComponent;
  let fixture: ComponentFixture<TablaHistorialServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaHistorialServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaHistorialServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
