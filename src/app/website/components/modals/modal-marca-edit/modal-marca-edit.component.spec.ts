import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMarcaEditComponent } from './modal-marca-edit.component';

describe('ModalMarcaEditComponent', () => {
  let component: ModalMarcaEditComponent;
  let fixture: ComponentFixture<ModalMarcaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMarcaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMarcaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
