import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitudClienteEditComponent } from './modal-solicitud-cliente-edit.component';

describe('ModalClienteEditComponent', () => {
  let component: ModalSolicitudClienteEditComponent;
  let fixture: ComponentFixture<ModalSolicitudClienteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSolicitudClienteEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSolicitudClienteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
