import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';


@Component({
  selector: 'app-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements AfterViewInit {
  @ViewChild('myTree', {static: false}) myTree: jqxTreeComponent;
  @ViewChild('ContentPanel', {static: false}) ContentPanel: ElementRef;
  data: any[] =
  [
    {
        'id': '2',
        'parentid': '1',
        'text': 'Hot Chocolate',
        'value': '$2.3'
    }, {
        'id': '3',
        'parentid': '1',
        'text': 'Peppermint Hot Chocolate',
        'value': '$2.3'
    }, {
        'id': '4',
        'parentid': '1',
        'text': 'Salted Caramel Hot Chocolate',
        'value': '$2.3'
    }, {
        'id': '5',
        'parentid': '1',
        'text': 'White Hot Chocolate',
        'value': '$2.3'
    }, {
        'text': 'Chocolate Beverage',
        'id': '1',
        'parentid': '-1',
        'value': '$2.3'
    }, {
        'id': '6',
        'text': 'Espresso Beverage',
        'parentid': '-1',
        'value': '$2.3'
    }, {
        'id': '7',
        'parentid': '6',
        'text': 'Caffe Americano',
        'value': '$2.3'
    }
  ];

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

  constructor() {}

  getWidth(): any {
      if (document.body.offsetWidth < 650) {
          return '90%';
      }

      return 650;
  }

  ngAfterViewInit() {
      this.myTree.elementRef.nativeElement.firstChild.style.border = 'none';
  }
  select(event: any): void {
      this.ContentPanel.nativeElement.innerHTML = '<div style=\'margin: 10px;\'>' + event.args.element.id + '</div>';
  }
}
