import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceCodeComponent } from './ace-code.component';

describe('AceCodeComponent', () => {
  let component: AceCodeComponent;
  let fixture: ComponentFixture<AceCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
