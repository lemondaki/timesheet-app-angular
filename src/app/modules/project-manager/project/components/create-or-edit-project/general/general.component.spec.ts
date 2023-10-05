import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralComponent } from './general.component';
import { apiService } from 'src/app/modules/project-manager/service/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GeneralComponent', () => {
  let component: GeneralComponent;
  let fixture: ComponentFixture<GeneralComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.inject(apiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
