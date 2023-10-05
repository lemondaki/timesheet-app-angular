import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamMemberSelectedComponent } from './team-member-selected.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';

describe('TeamMemberSelectedComponent', () => {
  let component: TeamMemberSelectedComponent;
  let fixture: ComponentFixture<TeamMemberSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TeamMemberSelectedComponent],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamMemberSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
