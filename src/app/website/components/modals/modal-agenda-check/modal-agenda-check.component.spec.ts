import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgendaCheckComponent } from './modal-agenda-check.component';

describe('ModalAgendaCheckComponent', () => {
  let component: ModalAgendaCheckComponent;
  let fixture: ComponentFixture<ModalAgendaCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgendaCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgendaCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
