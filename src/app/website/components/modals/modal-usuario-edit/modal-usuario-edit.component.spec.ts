import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarioEditComponent } from './modal-usuario-edit.component';

describe('ModalUsuarioEditComponent', () => {
  let component: ModalUsuarioEditComponent;
  let fixture: ComponentFixture<ModalUsuarioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUsuarioEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUsuarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
