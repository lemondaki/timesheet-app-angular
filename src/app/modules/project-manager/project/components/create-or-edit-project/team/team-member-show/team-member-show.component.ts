import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { projectService } from 'src/app/modules/project-manager/service/project.service';
import { ETypeMember } from 'src/app/modules/project-manager/enum/project.enum';
import { IBranchFilter } from 'src/app/modules/project-manager/interface/project.interface';
import { ITeamUser } from 'src/app/modules/project-manager/interface/response.interface';
import { apiService } from 'src/app/modules/project-manager/service/api.service';

@Component({
  selector: 'app-team-member-show',
  templateUrl: './team-member-show.component.html',
  styleUrls: ['./team-member-show.component.scss'],
})
export class TeamMemberShowComponent implements OnInit {
  openPanelTeamMemberShow: boolean = false;
  currentSelectedBranch: number = 0;
  currentSelectedType: number = -1;
  searchInputValue: string = '';
  currentSearchTeamMemberSelected: string = '';
  @Input() teamFormGroup!: FormGroup;
  typeMember = [
    { type: ETypeMember.ALL },
    { type: ETypeMember.INTERNSHIP },
    { type: ETypeMember.STAFF },
    { type: ETypeMember.COLLABORATOR },
  ];
  allBranch: IBranchFilter[] = [{ name: '', displayName: '', id: 0 }];
  searchTeamMemberShow!: ITeamUser[];
  cloneTeamMemberShow: ITeamUser[] = [];
  constructor(
    private apiService: apiService,
    private projectService: projectService
  ) {}

  get memberFormArray() {
    return this.teamFormGroup.get('users') as FormArray;
  }

  handleSendMemberItem(event: ITeamUser) {
    this.projectService.teamMemberSelect.next(event);
    this.cloneTeamMemberShow = this.cloneTeamMemberShow.filter(
      (member) => member.id !== event.id
    );
    this.handleFilterMemberChange();
  }

  searchTeamMember() {
    const lowcaseSearchInput = this.searchInputValue.toLocaleLowerCase();
    this.searchTeamMemberShow = [...this.cloneTeamMemberShow].filter(
      (member) =>
        member.name.toLowerCase().includes(lowcaseSearchInput) ||
        member.emailAddress.toLowerCase().includes(lowcaseSearchInput)
    );
  }

  filterMember() {
    if (this.currentSelectedBranch) {
      this.searchTeamMemberShow = this.searchTeamMemberShow.filter(
        (member) => member.branchId === this.currentSelectedBranch
      );
    }
    if (this.currentSelectedType !== -1) {
      this.searchTeamMemberShow = this.searchTeamMemberShow.filter(
        (member) => member.type === this.currentSelectedType
      );
    }
  }

  handleFilterMemberChange() {
    this.searchTeamMember();
    this.filterMember();
  }

  ngOnInit(): void {
    this.apiService.getAllBranchFilter().subscribe((data) => {
      this.allBranch = data;
    });

    this.projectService.teamMemberRemove.subscribe((memberRemove) => {
      if (memberRemove) {
        this.cloneTeamMemberShow.unshift(memberRemove);
        this.handleFilterMemberChange();
      }
    });

    this.apiService.getAllTeamUser().subscribe((data) => {
      this.cloneTeamMemberShow = data;
      this.searchTeamMemberShow = data;
      this.projectService.teamMemberData.next(data);
    });

    this.projectService.teamMemberDataEdit.subscribe((data) => {
      if (data) {
        const memberFormArrayId = data.map((member: ITeamUser) => member.id);
        this.cloneTeamMemberShow = this.cloneTeamMemberShow.filter(
          (user) => !memberFormArrayId.includes(user.id)
        );
        this.searchTeamMemberShow = this.cloneTeamMemberShow;
      }
    });
  }
}
