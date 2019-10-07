import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { File } from '../../_models/file';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { environment } from '../../../environments/environment';
import { SweetAlertService } from 'app/_services/sweetalert.service';

@Component({
  selector: 'app-fileadd',
  templateUrl: './fileadd.component.html',
  styleUrls: ['./fileadd.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() files: File[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: File;

  constructor(private authService: AuthService, private userService: UserService,
              private sweetAlertService: SweetAlertService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'files/',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: File = JSON.parse(response);
        const file = {
          id: res.id,
          url: res.url,
          description: res.description,
        };
        this.files.push(file);
      }
    };
  }
}