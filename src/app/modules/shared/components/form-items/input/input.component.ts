import {Component, Input, Output} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {ErrorMessage} from '../../../enums/error-message.enum';
import {Subject} from 'rxjs';
import {URL_REGEX} from '../../../constants/url.constant';

@Component({
  selector: 'rb-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent{

  constructor() { }

  @Input() control: FormControl | AbstractControl = new FormControl();
  @Input() label: string;
  @Input() placeholder: string;
  @Input() disabled = false;
  @Input() type: 'email' | 'text' | 'number' | 'password' | 'file' = 'text';
  @Input() pattern: string | RegExp;
  @Input() appearance: 'outlined' | 'standard' = 'standard';
  @Input() inputType: 'input' | 'textarea' | 'quill' = 'input';
  @Output() onFileSelected = new Subject();
  passwordVisible = false;
  focused = false;

  getErrorMessage() {
    const errors: any = this.control.errors;
    switch (true) {
      case errors?.required: return ErrorMessage.REQUIRED;
      case errors?.email: return ErrorMessage.EMAIL;
      case !!errors?.minlength: return ErrorMessage.SHORT;
      case this.pattern === URL_REGEX && !new RegExp(this.pattern).test(this.control.value): return ErrorMessage.URL;
      default: return ;
    }
  }

  getQuillModules() {
    return {
      toolbar: {
        container:
          [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'size': ['small', 'normal', 'large']}],
            [{color: []}, {'background': []}],
            ['link','image', 'video']
          ],
      }
    };
  }
}
