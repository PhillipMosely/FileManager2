import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';
import { jqxDropDownButtonComponent } from 'jqwidgets-ng/jqxdropdownbutton';

@Component({
  selector: 'app-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements OnInit, AfterViewInit {
  @ViewChild('treeReference', {static: false}) tree: jqxTreeComponent;
  treeSource: any[] =
  [
      {
          label: 'Mail', expanded: true,
          items:
          [
              { label: 'Calendar' },
              { label: 'Contacts', selected: true }
          ]
      },
      {
          label: 'Inbox', expanded: true,
          items:
          [
              { label: 'Admin' },
              { label: 'Corporate' },
              { label: 'Finance' },
              { label: 'Other' },
          ]
      },
      { label: 'Deleted Items' },
      { label: 'Notes' },
      { label: 'Settings' },
      { label: 'Favorites' }
  ];
  constructor() { }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
      setTimeout(() => {
          this.tree.selectItem(null);
      });
  }

}
