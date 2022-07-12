import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgendaEditComponent } from './modal-agenda-edit.component';

describe('ModalAgendaEditComponent', () => {
  let component: ModalAgendaEditComponent;
  let fixture: ComponentFixture<ModalAgendaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgendaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgendaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
