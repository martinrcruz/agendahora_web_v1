import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCalendarioAddComponent } from './modal-calendario-add.component';

describe('ModalCalendarioAddComponent', () => {
  let component: ModalCalendarioAddComponent;
  let fixture: ComponentFixture<ModalCalendarioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCalendarioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCalendarioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
