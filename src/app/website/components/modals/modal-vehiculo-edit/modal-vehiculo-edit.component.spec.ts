import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVehiculoEditComponent } from './modal-vehiculo-edit.component';

describe('ModalVehiculoEditComponent', () => {
  let component: ModalVehiculoEditComponent;
  let fixture: ComponentFixture<ModalVehiculoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVehiculoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVehiculoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
