import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServicioEditComponent } from './modal-servicio-edit.component';

describe('ModalServicioEditComponent', () => {
  let component: ModalServicioEditComponent;
  let fixture: ComponentFixture<ModalServicioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalServicioEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalServicioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
