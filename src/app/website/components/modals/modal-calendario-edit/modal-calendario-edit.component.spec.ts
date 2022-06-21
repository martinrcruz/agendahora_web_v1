import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCalendarioEditComponent } from './modal-calendario-edit.component';

describe('ModalCalendarioEditComponent', () => {
  let component: ModalCalendarioEditComponent;
  let fixture: ComponentFixture<ModalCalendarioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCalendarioEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCalendarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
