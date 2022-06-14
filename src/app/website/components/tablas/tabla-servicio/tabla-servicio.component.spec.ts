import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaServicioComponent } from './tabla-servicio.component';

describe('TablaServicioComponent', () => {
  let component: TablaServicioComponent;
  let fixture: ComponentFixture<TablaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
