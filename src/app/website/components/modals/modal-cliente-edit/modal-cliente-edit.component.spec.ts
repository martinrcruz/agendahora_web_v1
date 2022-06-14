import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClienteEditComponent } from './modal-cliente-edit.component';

describe('ModalClienteEditComponent', () => {
  let component: ModalClienteEditComponent;
  let fixture: ComponentFixture<ModalClienteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClienteEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClienteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
