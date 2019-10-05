import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';
import { ActivatedRoute } from '@angular/router';
import { FileManagerAdmin } from 'app/_models/filemanageradmin';
import { JsonPipe } from '@angular/common';


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

  records: any = this.dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);

  constructor(private route: ActivatedRoute) {}

  getWidth(): any {
      if (document.body.offsetWidth < 650) {
          return '90%';
      }

      return 650;
  }
  ngOnInit() {
      this.route.data.subscribe(data => {
          this.fmAdmin = data['fmAdmin'];
      });
      this.data  = JSON.parse(this.fmAdmin.folderData);
  }
  
  ngAfterViewInit() {
      this.myTree.elementRef.nativeElement.firstChild.style.border = 'none';
  }
  select(event: any): void {
      this.ContentPanel.nativeElement.innerHTML = '<div style=\'margin: 10px;\'>' + event.args.element.id + '</div>';
  }
}
