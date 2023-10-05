import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { apiService } from 'src/app/modules/project-manager/service/api.service';
import {
  ICustomer,
  IProjectType,
} from 'src/app/modules/project-manager/interface/project.interface';

import {
  EProjectType,
  EProjectTypeValue,
} from 'src/app/modules/project-manager/enum/project.enum';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  @Input() generalFormGroup!: FormGroup;
  selectProjectType: number = EProjectTypeValue.FIXEDPRICE;
  allCustomer: ICustomer[] = [];
  projectType: IProjectType[] = [
    { projectTypeId: EProjectTypeValue.TM, typeName: EProjectType.TM },
    {
      projectTypeId: EProjectTypeValue.FIXEDPRICE,
      typeName: EProjectType.FIXEDPRICE,
    },
    {
      projectTypeId: EProjectTypeValue.NONBILLABLE,
      typeName: EProjectType.NONBILLABLE,
    },
    { projectTypeId: EProjectTypeValue.ODC, typeName: EProjectType.ODC },
    {
      projectTypeId: EProjectTypeValue.PRODUCT,
      typeName: EProjectType.PRODUCT,
    },
    {
      projectTypeId: EProjectTypeValue.TRAINING,
      typeName: EProjectType.TRAINING,
    },
    {
      projectTypeId: EProjectTypeValue.NOSALLARY,
      typeName: EProjectType.NOSALLARY,
    },
  ];
  constructor(private apiService: apiService) {}
  ngOnInit(): void {
    this.apiService.getAllCustomer().subscribe((data) => {
      this.allCustomer = data.result.flat();
    });
  }
}
