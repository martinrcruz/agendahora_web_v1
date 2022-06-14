import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVehiculoAddComponent } from './modal-vehiculo-add.component';

describe('ModalVehiculoAddComponent', () => {
  let component: ModalVehiculoAddComponent;
  let fixture: ComponentFixture<ModalVehiculoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVehiculoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVehiculoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
