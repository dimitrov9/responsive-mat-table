import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatPaginator, MatSort } from '@angular/material';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { AppTableComponent } from './app-table/app-table.component';

import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  exampleDatabase: ExampleHttpDao | null;
  data: GithubIssue[] = [];

  resultsLength = 0;

  isGtXs = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(AppTableComponent) appTable: AppTableComponent;
  @BlockUI('app-list') blockUI: NgBlockUI;

  sort: MatSort;

  constructor(private http: HttpClient, public media: ObservableMedia) {}

  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http);
    this.refresh();
    this.paginator.page.subscribe(() => this.refresh());
    this.media.subscribe(() => (this.isGtXs = this.media.isActive('gt-xs')));
  }

  sortChange(sort: MatSort) {
    this.sort = sort;
    this.refresh();
  }

  refresh(): void {
    this.blockUI.start('Loading...');
    // tslint:disable-next-line:no-non-null-assertion
    this.exampleDatabase!.getRepoIssues(
      this.sort ? this.sort.active : 'created',
      this.sort ? this.sort.direction : 'asc',
      this.paginator.pageIndex
    )
      .pipe(
        map(data => {
          this.blockUI.stop();
          this.resultsLength = data.total_count;
          return data.items;
        }),
        catchError(() => {
          this.blockUI.update(
            'GitHub\'s API rate limit has been reached. It will be reset in one minute.'
          );
          return observableOf([]);
        })
      )
      .subscribe(data => (this.data = data));
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  getRepoIssues(
    sort: string,
    order: string,
    page: number
  ): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page +
      1}`;

    return this.http.get<GithubApi>(requestUrl);
  }
}
