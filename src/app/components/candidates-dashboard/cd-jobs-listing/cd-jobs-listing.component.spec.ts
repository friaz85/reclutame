/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CdJobsListingComponent } from './cd-jobs-listing.component';

describe('CdJobsListingComponent', () => {
  let component: CdJobsListingComponent;
  let fixture: ComponentFixture<CdJobsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdJobsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdJobsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
