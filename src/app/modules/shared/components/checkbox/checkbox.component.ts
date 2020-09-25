import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'rb-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  constructor() { }
  @Input() control: FormControl = new FormControl();
  @Input() index: number;

  ngOnInit() {
  }

}
