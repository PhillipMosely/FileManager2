import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AgmCoreModule
} from '@agm/core';
import { FilemanagerRoutes } from './filemanager.routing';
import { FilemanagerComponent } from './filemanager.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FilemanagerRoutes),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
],
declarations: [FilemanagerComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilemanagerModule { }
