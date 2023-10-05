import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { projectService } from 'src/app/modules/project-manager/service/project.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  currentFilterNumber: number = 0;
  currentSeacrhValue: string = '';
  cancelAction = {
    isDoAction: false,
    currentSeacrhValue: '',
    currentFilterNumber: 0,
  };
  acceptAction = {
    isDoAction: true,
    currentSeacrhValue: '',
    currentFilterNumber: 0,
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { actionTitle: string; name: string },
    private projectService: projectService
  ) {}
  ngOnInit(): void {
    this.projectService.currentSeacrhValue.subscribe((searchValue) => {
      this.currentSeacrhValue = searchValue;
      this.acceptAction.currentSeacrhValue = searchValue;
    });
    this.projectService.currentFilterNumber.subscribe((filterNumber) => {
      this.currentFilterNumber = filterNumber;
      this.acceptAction.currentFilterNumber = this.currentFilterNumber;
    });
  }
}
