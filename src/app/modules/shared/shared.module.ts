import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SlidingArrowComponent } from './components/sliding-arrow/sliding-arrow.component';



@NgModule({
  declarations: [CustomInputComponent, SlidingArrowComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CustomInputComponent, SlidingArrowComponent]
})
export class SharedModule { }
