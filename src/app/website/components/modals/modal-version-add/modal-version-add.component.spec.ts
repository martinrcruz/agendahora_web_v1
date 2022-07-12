import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVersionAddComponent } from './modal-version-add.component';

describe('ModalVersionAddComponent', () => {
  let component: ModalVersionAddComponent;
  let fixture: ComponentFixture<ModalVersionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVersionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVersionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
