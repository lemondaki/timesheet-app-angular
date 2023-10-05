import { ComponentFixture, TestBed } from '@angular/core/testing';
import { authService } from 'src/app/modules/auth/service/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.inject(authService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
