import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarioAddComponent } from './modal-usuario-add.component';

describe('ModalUsuarioAddComponent', () => {
  let component: ModalUsuarioAddComponent;
  let fixture: ComponentFixture<ModalUsuarioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUsuarioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUsuarioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
