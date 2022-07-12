import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVersionEditComponent } from './modal-version-edit.component';

describe('ModalVersionEditComponent', () => {
  let component: ModalVersionEditComponent;
  let fixture: ComponentFixture<ModalVersionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVersionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVersionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
