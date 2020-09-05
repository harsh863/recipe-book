import {Component, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'rb-sliding-arrow',
  templateUrl: './sliding-arrow.component.html',
  styleUrls: ['./sliding-arrow.component.scss']
})
export class SlidingArrowComponent {

  @Output() onClicked = new Subject<boolean>();

  constructor() { }

}
