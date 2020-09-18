import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SlidingArrowComponent } from './components/sliding-arrow/sliding-arrow.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import {NotificationService} from './services/notification.service';


@NgModule({
  declarations: [CustomInputComponent, SlidingArrowComponent, FilterBarComponent, SnackbarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  entryComponents: [SnackbarComponent],
  providers: [NotificationService],
    exports: [CustomInputComponent, SlidingArrowComponent,
        FilterBarComponent, SnackbarComponent]
})
export class SharedModule { }
