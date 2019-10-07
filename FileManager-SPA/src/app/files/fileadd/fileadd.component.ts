import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileService } from 'app/_services/file.service';
import { SweetAlertComponent } from 'app/components/sweetalert/sweetalert.component';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fileadd',
  templateUrl: './fileadd.component.html',
  styleUrls: ['./fileadd.component.css']
})
export class FileaddComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  file: File;

  @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
      if (this.editForm.dirty) {
        $event.returnValue = true;
      }
  }

  constructor(private route: ActivatedRoute,
              private fileService: FileService, private sweetAlertService: SweetAlertService) { }

  ngOnInit() {

  }

  addFile() {
    this.fileService.
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }
}
