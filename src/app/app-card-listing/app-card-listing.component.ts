import { Component, Input, ViewChild } from '@angular/core';
import { GithubIssue } from '../app.component';
import { MatAccordion } from '@angular/material';

@Component({
  selector: 'app-card-listing',
  templateUrl: './app-card-listing.component.html',
  styleUrls: ['./app-card-listing.component.css']
})
export class AppCardListingComponent {
  shouldExtendAll = true;

  @Input() data: GithubIssue[];
  @ViewChild(MatAccordion) accordion: MatAccordion;

  expandAll() {
    this.shouldExtendAll = false;
    this.accordion.openAll();
  }

  collapseAll() {
    this.shouldExtendAll = true;
    this.accordion.closeAll();
  }
}
