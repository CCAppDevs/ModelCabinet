  import { Component, Input } from '@angular/core';
  import { emptyTag, Tag } from '../../Models/tag';

@Component({
  selector: 'app-tag-label',
  templateUrl: './tag-label.component.html',
  styleUrl: './tag-label.component.css'
})
export class TagLabelComponent {
  @Input() tagLabel: Tag = emptyTag
}
