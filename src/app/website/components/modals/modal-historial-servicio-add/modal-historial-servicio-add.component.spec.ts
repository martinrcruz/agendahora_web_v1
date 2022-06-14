import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistorialServicioAddComponent } from './modal-historial-servicio-add.component';

describe('ModalHistorialServicioAddComponent', () => {
  let component: ModalHistorialServicioAddComponent;
  let fixture: ComponentFixture<ModalHistorialServicioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHistorialServicioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHistorialServicioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
