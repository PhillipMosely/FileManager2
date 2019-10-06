import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';
import { ActivatedRoute } from '@angular/router';
import { FileManagerAdmin } from 'app/_models/filemanageradmin';
import { FileManagerAdminService } from 'app/_services/filemanageradmin.service';
import { SweetAlertService } from 'app/_services/sweetalert.service';


@Component({
  selector: 'app-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements AfterViewInit, OnInit {
  @ViewChild('myTree', {static: false}) myTree: jqxTreeComponent;
  @ViewChild('ContentPanel', {static: false}) ContentPanel: ElementRef;

  data: any[];
  fmAdmin: FileManagerAdmin;
  source = {
    datatype: 'json',
    datafields: [
        { name: 'id' },
        { name: 'parentid' },
        { name: 'text' },
        { name: 'value' }
    ],
    id: 'id',
    localdata: this.data
    };

  dataAdapter = new jqx.dataAdapter(this.source, { autoBind: true });
  records = this.dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);


  constructor(private route: ActivatedRoute,
              private fileManagerAdminService: FileManagerAdminService,
              private sweetAlertService: SweetAlertService) {}

  getWidth(): any {
      if (document.body.offsetWidth < 1000) {
          return '90%';
      }

      return 1000;
  }
  ngOnInit() {
     this.fileManagerAdminService.getFMAdminForUserId(1)
        .subscribe(
            (res: FileManagerAdmin) => {
                this.fmAdmin = res;
                this.data  = JSON.parse(this.fmAdmin.folderData);
                this.sweetAlertService.message(this.fmAdmin.subFolderName);
            }, error => {
                this.sweetAlertService.error('Could not load FM admin');
            }
        )
  }

  ngAfterViewInit() {
      this.myTree.elementRef.nativeElement.firstChild.style.border = 'none';
  }
  select(event: any): void {
      this.ContentPanel.nativeElement.innerHTML = '<div style=\'margin: 10px;\'>' + event.args.element.id + '</div>';
  }
}
