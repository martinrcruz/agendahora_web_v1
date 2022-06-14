import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitudVehiculoEditComponent } from './modal-solicitud-vehiculo-edit.component';

describe('ModalSolicitudVehiculoEditComponent', () => {
  let component: ModalSolicitudVehiculoEditComponent;
  let fixture: ComponentFixture<ModalSolicitudVehiculoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSolicitudVehiculoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSolicitudVehiculoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});