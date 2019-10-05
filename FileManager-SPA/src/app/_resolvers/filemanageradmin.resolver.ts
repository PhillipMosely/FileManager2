import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { FileManagerAdminService } from '../_services/filemanageradmin.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { FileManagerAdmin } from 'app/_models/filemanageradmin';

@Injectable()
 export class FileManagerAdminResolver implements Resolve<FileManagerAdmin> {
    constructor(private fmAdminService: FileManagerAdminService,
                private router: Router, private sweetAlertService: SweetAlertService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<FileManagerAdmin> {
        return this.fmAdminService.getFMAdminForUserId(route.params.id).pipe(
            catchError(error => {
                this.sweetAlertService.error('Problem retrieving data');
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
 }
