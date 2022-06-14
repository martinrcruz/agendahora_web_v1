import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistorialServicioEditComponent } from './modal-historial-servicio-edit.component';

describe('ModalHistorialServicioEditComponent', () => {
  let component: ModalHistorialServicioEditComponent;
  let fixture: ComponentFixture<ModalHistorialServicioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHistorialServicioEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHistorialServicioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
