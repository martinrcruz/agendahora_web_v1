import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClienteAddComponent } from './modal-cliente-add.component';

describe('ModalClienteAddComponent', () => {
  let component: ModalClienteAddComponent;
  let fixture: ComponentFixture<ModalClienteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClienteAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClienteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
