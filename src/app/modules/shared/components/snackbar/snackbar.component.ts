import {Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'rb-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  constructor() { }

  @Input() message: string;
  @Input() type: 'error' | 'success' | 'warn' | 'info';
  @Output() onClose = new Subject();

  getIcon(type: 'error' | 'success' | 'warn' | 'info') {
    const basePath = '../../../../../assets/icons/';
    switch (type) {
      case 'success': return basePath + 'checked.png';
      case 'warn': return basePath + 'warn.png';
      case 'error' : return basePath + 'error.png';
      case 'info' : return basePath + 'info.png';
    }
  }

  getBackgroundColor(type: 'error' | 'success' | 'warn' | 'info') {
    switch (type) {
      case 'success': return '#52c15d';
      case 'warn': return '#febd2a';
      case 'error': return '#f6432f';
      case 'info': return '#d0defb';
    }
  }

}
