import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'rb-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {

  constructor() { }

  @Input() placeholder;
  @Input() control: FormControl;
  isSearchBarVisible = false;
}
