import { Component, Input } from '@angular/core';
import { ITeamUser } from 'src/app/modules/project-manager/interface/response.interface';

@Component({
  selector: 'app-team-member-item',
  templateUrl: './team-member-item.component.html',
  styleUrls: ['./team-member-item.component.scss'],
})
export class TeamMemberItemComponent {
  @Input() memberItem!: ITeamUser;
}
