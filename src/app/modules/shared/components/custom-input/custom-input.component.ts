import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ErrorMessage} from '../../enums/error-message.enum';

@Component({
  selector: 'rb-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent{

  constructor() { }

  @Input() control = new FormControl();
  @Input() label: string;
  @Input() placeholder: string;
  @Input() disabled = false;
  @Input() type: 'email' | 'text' | 'password' = 'text';
  @Input() pattern: string;
  passwordVisible = false;
  focused = false;


  getErrorMessage() {
    const errors: any = this.control.errors;
    switch (true) {
      case errors.required: return ErrorMessage.REQUIRED;
      case errors.email: return ErrorMessage.EMAIL;
      case !!errors.minlength: return ErrorMessage.SHORT;
    }
  }
}
