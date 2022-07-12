import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModeloEditComponent } from './modal-modelo-edit.component';

describe('ModalModeloEditComponent', () => {
  let component: ModalModeloEditComponent;
  let fixture: ComponentFixture<ModalModeloEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalModeloEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModeloEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
