import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServicioAddComponent } from './modal-servicio-add.component';

describe('ModalServicioAddComponent', () => {
  let component: ModalServicioAddComponent;
  let fixture: ComponentFixture<ModalServicioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalServicioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalServicioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
