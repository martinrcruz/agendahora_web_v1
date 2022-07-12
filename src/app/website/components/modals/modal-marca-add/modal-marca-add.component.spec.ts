import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMarcaAddComponent } from './modal-marca-add.component';

describe('ModalMarcaAddComponent', () => {
  let component: ModalMarcaAddComponent;
  let fixture: ComponentFixture<ModalMarcaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMarcaAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMarcaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
