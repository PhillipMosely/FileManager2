/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FileaddComponent } from './fileadd.component';

describe('FileaddComponent', () => {
  let component: FileaddComponent;
  let fixture: ComponentFixture<FileaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
