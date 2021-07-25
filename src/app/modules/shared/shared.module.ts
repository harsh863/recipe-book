import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';
import {QuillModule} from 'ngx-quill';

import { SlidingArrowComponent } from './components/sliding-arrow/sliding-arrow.component';
import { InputComponent } from './components/form-items/input/input.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const modules = [CommonModule, FormsModule, ReactiveFormsModule];
const components = [InputComponent, SlidingArrowComponent, FilterBarComponent,
  SnackbarComponent, CheckboxComponent, PageNotFoundComponent];
const entryComponents = [SnackbarComponent];
const angularFireDependencies = [AngularFireAuth, AngularFireDatabase, AngularFireStorage];

@NgModule({
  declarations: [...components],
  imports: [...modules, QuillModule.forRoot()],
  entryComponents: [...entryComponents],
  providers: [...angularFireDependencies],
  exports: [...modules, ...components]
})
export class SharedModule { }
