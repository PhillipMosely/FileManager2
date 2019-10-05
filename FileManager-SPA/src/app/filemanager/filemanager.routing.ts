import { Routes } from '@angular/router';
import { FilemanagerComponent } from './filemanager.component';
import { FileManagerAdminResolver } from 'app/_resolvers/filemanageradmin.resolver';

export const FilemanagerRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'filemanager',
      component: FilemanagerComponent
  }]
}];
