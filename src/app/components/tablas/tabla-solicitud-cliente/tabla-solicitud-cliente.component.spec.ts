import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSolicitudClienteComponent } from './tabla-solicitud-cliente.component';

describe('TablaSolicitudClienteComponent', () => {
  let component: TablaSolicitudClienteComponent;
  let fixture: ComponentFixture<TablaSolicitudClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSolicitudClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSolicitudClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
