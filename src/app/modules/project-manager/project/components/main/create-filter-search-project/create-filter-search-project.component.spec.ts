import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFilterSearchProjectComponent } from './create-filter-search-project.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateFilterSearchProjectComponent', () => {
  let component: CreateFilterSearchProjectComponent;
  let fixture: ComponentFixture<CreateFilterSearchProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CreateFilterSearchProjectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFilterSearchProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
