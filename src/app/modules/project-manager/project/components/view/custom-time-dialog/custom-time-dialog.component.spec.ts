import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomTimeDialogComponent } from './custom-time-dialog.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
describe('CustomTimeDialogComponent', () => {
  let component: CustomTimeDialogComponent;
  let fixture: ComponentFixture<CustomTimeDialogComponent>;
  beforeEach(async () => {
    const mockDialogRef = {
      close: jasmine.createSpy('close'),
    };
    await TestBed.configureTestingModule({
      declarations: [CustomTimeDialogComponent],
      imports: [MatDialogModule],
      providers: [
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
