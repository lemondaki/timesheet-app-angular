import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksSelectComponent } from './tasks-select.component';

describe('TasksSelectComponent', () => {
  let component: TasksSelectComponent;
  let fixture: ComponentFixture<TasksSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
