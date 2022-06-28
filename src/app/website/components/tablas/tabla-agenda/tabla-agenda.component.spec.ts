import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAgendaComponent } from './tabla-agenda.component';

describe('TablaAgendaComponent', () => {
  let component: TablaAgendaComponent;
  let fixture: ComponentFixture<TablaAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
