import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatSortModule,
  MatPaginatorModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatExpansionModule,
  MatCardModule
} from '@angular/material';
import { AppTableComponent } from './app-table/app-table.component';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';
import { AppCardListingComponent } from './app-card-listing/app-card-listing.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppComponent, AppTableComponent, AppCardListingComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BlockUIModule.forRoot(),
    FlexLayoutModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
