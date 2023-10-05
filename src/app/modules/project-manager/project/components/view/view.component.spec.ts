import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewComponent } from './view.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewService } from '../../../service/view.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ViewComponent],
      providers: [MatDialogModule, MAT_DIALOG_DATA],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.inject(ViewService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
