import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamMemberShowComponent } from './team-member-show.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeamMemberShowComponent', () => {
  let component: TeamMemberShowComponent;
  let fixture: ComponentFixture<TeamMemberShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TeamMemberShowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamMemberShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
