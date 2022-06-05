import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAgendaComponent } from './historial-agenda.component';

describe('HistorialAgendaComponent', () => {
  let component: HistorialAgendaComponent;
  let fixture: ComponentFixture<HistorialAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
