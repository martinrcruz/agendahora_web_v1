import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServicioCheckComponent } from './modal-servicio-check.component';

describe('ModalServicioCheckComponent', () => {
  let component: ModalServicioCheckComponent;
  let fixture: ComponentFixture<ModalServicioCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalServicioCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalServicioCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
