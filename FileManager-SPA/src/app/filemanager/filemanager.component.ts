import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';
import { ActivatedRoute } from '@angular/router';
import { FileManagerAdmin } from 'app/_models/filemanageradmin';
import { FileManagerAdminService } from 'app/_services/filemanageradmin.service';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { FileService } from 'app/_services/file.service';
import { PaginatedResult } from 'app/_models/Pagination';


@Component({
  selector: 'app-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements AfterViewInit, OnInit {
  @ViewChild('myTree', {static: false}) myTree: jqxTreeComponent;
  @ViewChild('ContentPanel', {static: false }) ContentPanel: ElementRef;

  data: any[];
  fmAdmin: FileManagerAdmin;
  source: any;
  dataAdapter: any;
  records: any;

  tableSource: any;
  tableDataAdaptor: any;
  tableColumns: any[] =
  [
      { text: 'File Name', cellsAlign: 'center', align: 'center', dataField: 'fileName', width: 150 },
      { text: 'Size', dataField: 'size', cellsFormat: 'd', cellsAlign: 'center', align: 'center', width: 120 },
      { text: 'Date Modified', datafield: 'dateModified', width: 120, cellsFormat: 'D' },
      { text: 'Ext', cellsAlign: 'center', align: 'center', dataField: 'ext', width: 120 },
      { text: 'URL', cellsAlign: 'center', align: 'center', dataField: 'url', width: 250 },
  ];

  constructor(private route: ActivatedRoute,
              private fileManagerAdminService: FileManagerAdminService,
              private fileService: FileService,
              private sweetAlertService: SweetAlertService) {}

  getWidth(): any {
      if (document.body.offsetWidth < 1000) {
          return '90%';
      }

      return 1000;
  }
  ngOnInit() {
     this.fileManagerAdminService.getFMAdminForUserId(2)
        .subscribe(
            (res: FileManagerAdmin) => {
                this.fmAdmin = res;
                this.data  = JSON.parse(this.fmAdmin.folderData);
                this.source = {
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
                  this.dataAdapter = new jqx.dataAdapter(this.source, { autoBind: true });
                  this.records = this.dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
                  this.myTree.source(this.records);
                  this.myTree.refresh();
            }, error => {
                this.sweetAlertService.error('Could not load FM admin');
            }
        )
  }

  ngAfterViewInit() {
      this.myTree.elementRef.nativeElement.firstChild.style.border = 'none';
  }
  select(event: any): void {
      if (this.fmAdmin != null) {
        this.fileService.getFiles(this.fmAdmin.id, event.args.element.id, 1, 20 ).subscribe(
            (res: PaginatedResult<File[]>) => {
                this.tableSource = {
                    dataType: 'json',
                    dataFields: [
                        { name: 'fileName', type: 'string' },
                        { name: 'ext', type: 'string' },
                        { name: 'url', type: 'string' },
                        { name: 'size', type: 'number' },
                        { name: 'dateCreated', type: 'date' },
                        { name: 'dateModified', type: 'date' },
                        { name: 'description', type: 'string' }
                    ],
                    localdata: res
                };
                this.tableDataAdaptor = new jqx.dataAdapter(this.tableSource);
                // this.sweetAlertService.message(this.fmAdmin.id.toString() + event.args.element.id.toString())
                // var result = Object.keys(object).map(e=>object[e]);
            }, error => {
                this.sweetAlertService.error('Could not load Files');
            }
        );

      }
  }

}
