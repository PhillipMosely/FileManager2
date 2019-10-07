import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'app/components/modal/modal.module';
import { FileAddComponent } from './fileadd.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    FileUploadModule

],
declarations: [FileAddComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FileAddModule { }