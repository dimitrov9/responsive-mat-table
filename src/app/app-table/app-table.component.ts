import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { GithubIssue } from '../app.component';
import { MatPaginator, MatSort } from '@angular/material';


@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css']
})
export class AppTableComponent implements OnInit {

  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  @ViewChild(MatSort) sort: MatSort;

  @Input() data: GithubIssue[];
  @Input() paginator: MatPaginator;

  @Output() sortChange = new EventEmitter();

  ngOnInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.sortChange.emit(this.sort);
    });
  }
}
