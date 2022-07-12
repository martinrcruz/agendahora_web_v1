import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaVersionComponent } from './tabla-version.component';

describe('TablaVersionComponent', () => {
  let component: TablaVersionComponent;
  let fixture: ComponentFixture<TablaVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
