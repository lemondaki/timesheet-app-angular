import { Component, Input, OnInit } from '@angular/core';
import { FormArray, AbstractControl, FormBuilder } from '@angular/forms';
import { ITeamUser } from 'src/app/modules/project-manager/interface/response.interface';
import { projectService } from 'src/app/modules/project-manager/service/project.service';
import {
  EPositionMember,
  ETempMember,
} from 'src/app/modules/project-manager/enum/project.enum';
import {
  IPositionMember,
  ITempMember,
} from 'src/app/modules/project-manager/interface/project.interface';

@Component({
  selector: 'app-team-member-selected',
  templateUrl: './team-member-selected.component.html',
  styleUrls: ['./team-member-selected.component.scss'],
})
export class TeamMemberSelectedComponent implements OnInit {
  @Input() teamFormGroup!: AbstractControl;
  indexMemberRemove: number = 0;
  currentSelectedMember!: ITeamUser;
  searchTeamMemberSelected!: AbstractControl[];
  panelOpenTeam: boolean = false;
  searchInputValue: string = '';
  selectedPosition: number = 0;
  dataTypeMember!: IPositionMember;
  positionMember: IPositionMember[] = [
    {
      typeId: 0,
      typeName: EPositionMember.MEMBER,
    },
    {
      typeId: 1,
      typeName: EPositionMember.PM,
    },
    {
      typeId: 2,
      typeName: EPositionMember.SHADOW,
    },
    {
      typeId: 3,
      typeName: EPositionMember.DEACTIVE,
    },
  ];
  tempOfficalMember: ITempMember[] = [
    { isTemp: true, tempName: ETempMember.TEMP },
    { isTemp: false, tempName: ETempMember.OFFICIAL },
  ];
  constructor(
    private projectService: projectService,
    private fb: FormBuilder
  ) {}
  get memberFormArray() {
    return this.teamFormGroup.get('users') as FormArray;
  }

  handleSearchTeamMemberSelected() {
    const lowcaseInputSearch = this.searchInputValue;
    this.searchTeamMemberSelected = this.memberFormArray.controls.filter(
      (member) =>
        member.value.name.toLowerCase().includes(lowcaseInputSearch) ||
        member.value.emailAddress.toLowerCase().includes(lowcaseInputSearch)
    );
  }

  handleRemoveMemberItem(memberRemove: ITeamUser) {
    this.indexMemberRemove = this.memberFormArray.controls.findIndex(
      (member) => member.value.id === memberRemove.id
    );
    this.projectService.teamMemberRemove.next(memberRemove);
    this.memberFormArray.removeAt(this.indexMemberRemove);
    this.handleSearchTeamMemberSelected();
  }

  handleRunValidator() {
    this.memberFormArray.updateValueAndValidity();
  }

  handleAddnewMember(member: ITeamUser) {
    const newTeamMember = this.fb.control({
      ...member,
      isTemp: false,
    });
    this.memberFormArray.push(newTeamMember);
    this.searchTeamMemberSelected = this.memberFormArray.controls;
  }

  ngOnInit(): void {
    this.projectService.teamMemberSelect.subscribe((teamMember) => {
      if (teamMember) {
        this.handleAddnewMember(teamMember);
      }
    });
    this.searchTeamMemberSelected = this.memberFormArray.controls;
  }
}
