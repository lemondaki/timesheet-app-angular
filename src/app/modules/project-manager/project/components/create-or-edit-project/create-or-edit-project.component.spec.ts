import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateOrEditProjectComponent } from './create-or-edit-project.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
describe('CreateOrEditProjectComponent', () => {
  let component: CreateOrEditProjectComponent;
  let fixture: ComponentFixture<CreateOrEditProjectComponent>;

  beforeEach(async () => {
    const fakeActivatedRoute = {
      snapshot: {
        params: {},
      },
    } as ActivatedRoute;
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CreateOrEditProjectComponent],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
