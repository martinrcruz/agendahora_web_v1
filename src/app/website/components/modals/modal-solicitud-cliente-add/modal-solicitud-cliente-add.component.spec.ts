import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitudClienteAddComponent } from './modal-solicitud-cliente-add.component';

describe('ModalClienteAddComponent', () => {
  let component: ModalSolicitudClienteAddComponent;
  let fixture: ComponentFixture<ModalSolicitudClienteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSolicitudClienteAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSolicitudClienteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
