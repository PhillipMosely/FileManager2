import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { FileManagerAdmin } from '../_models/filemanageradmin';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getFiles(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginatedResult<File[]>> {
    const paginatedResult: PaginatedResult<File[]> = new PaginatedResult<File[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<File[]>(this.baseUrl + 'files', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getFilesForFMAdminIdUserId(fmAdminId, UserId): Observable<File> {
    return this.http.get<File>(this.baseUrl + 'files/getforfmadminiduserid/' + fmAdminId + '/' + UserId);
  }

  getFile(id): Observable<File> {
    return this.http.get<File>(this.baseUrl + 'files/' + id);
  }
  updateFile(id: number, file: File) {
    return this.http.put(this.baseUrl + 'files/' + id, file);
  }
  deleteFile(id: number) {
    return this.http.delete(this.baseUrl + 'files/' + id);
  }

}
