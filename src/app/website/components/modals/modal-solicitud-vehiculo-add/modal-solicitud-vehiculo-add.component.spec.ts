import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitudVehiculoAddComponent } from './modal-solicitud-vehiculo-add.component';

describe('ModalSolicitudVehiculoAddComponent', () => {
  let component: ModalSolicitudVehiculoAddComponent;
  let fixture: ComponentFixture<ModalSolicitudVehiculoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSolicitudVehiculoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSolicitudVehiculoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
