import { TestBed, inject } from '@angular/core/testing';
import { FormService } from './form.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

describe('FormService', () => {
  let component: FormService;
  let formGroup: FormGroup;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormService, FormBuilder],
    });
    component = TestBed.inject(FormService);
    formGroup = component.initFormGroup();
  });

  it('should be created', inject([FormService], (service: FormService) => {
    expect(service).toBeTruthy();
  }));

  it('should create general form group with required fields', () => {
    const generalFormGroup = formGroup.get('generalFormGroup');
    expect(generalFormGroup).toBeDefined();
    const customerId = generalFormGroup?.get('customerId');
    const name = generalFormGroup?.get('name');
    const code = generalFormGroup?.get('code');
    const timeStart = generalFormGroup?.get('timeStart');
    const timeEnd = generalFormGroup?.get('timeEnd');
    expect(customerId?.validator).toBe(Validators.required);
    expect(name?.validator).toBe(Validators.required);
    expect(code?.validator).toBe(Validators.required);
    expect(timeStart?.validator).toBe(Validators.required);
    expect(timeEnd?.validator).toBe(Validators.required);
  });

  it('should create task form group with required fields', () => {
    const taskFormGroup = formGroup.get('taskFormGroup');
    expect(taskFormGroup).toBeDefined();
    const tasks = taskFormGroup?.get('tasks');
    expect(tasks?.validator).toBe(Validators.required);
  });

  it('should create notification form group with optional fields', () => {
    const notificationFormGroup = formGroup.get('notificationFormGroup');
    expect(notificationFormGroup).toBeDefined();
    const komuChannelId = notificationFormGroup?.get('komuChannelId');
    const notifiList = notificationFormGroup?.get('notifiList');
    expect(komuChannelId?.validator).toBe(null);
    expect(notifiList?.validator).toBe(null);
  });
});
