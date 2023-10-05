import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chip-label',
  templateUrl: './chip-label.component.html',
  styleUrls: ['./chip-label.component.scss'],
  standalone: true,
})
export class ChipLabelComponent {
  constructor() {}
  @Input() typeLabel: string = '';
}
