import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'rb-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  constructor() { }

  @Input() message: string;
  @Input() type: 'error' | 'success' | 'warn';
  @Output() onClose = new Subject();

  getIcon(type: 'error' | 'success' | 'warn') {
    const basePath = '../../../../../assets/icons/';
    switch (type) {
      case 'success': return basePath + 'checked.png';
      case 'warn': return basePath + 'warn.png';
      case 'error': return basePath + 'error.png';
    }
  }

  getBackgroundColor(type: 'error' | 'success' | 'warn') {
    switch (type) {
      case 'success': return '#52c15d';
      case 'warn': return '#febd2a';
      case 'error': return '#f6432f'
    }
  }

}
