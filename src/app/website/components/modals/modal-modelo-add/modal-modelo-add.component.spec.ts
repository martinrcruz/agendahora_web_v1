import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModeloAddComponent } from './modal-modelo-add.component';

describe('ModalModeloAddComponent', () => {
  let component: ModalModeloAddComponent;
  let fixture: ComponentFixture<ModalModeloAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalModeloAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModeloAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
