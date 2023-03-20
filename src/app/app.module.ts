import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './materials/material/material.module';

import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ResizableModule } from 'angular-resizable-element';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CreatDialogComponent } from './components/s3Buckets/creat-dialog/creat-dialog.component';
import { CreatFolderComponent } from './components/s3Objects/creat-folder/creat-folder.component';
import { DeleteDialogComponent } from './components/s3Buckets/delete-dialog/delete-dialog.component';
import { AgGridContextMenuComponent } from './components/s3-browser/ag-grid-context-menu/ag-grid-context-menu.component';

import 'ag-grid-enterprise';
import { S3BrowserComponent } from './components/s3-browser/s3-browser.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatDialogComponent,
    DeleteDialogComponent,
    CreatFolderComponent,
    S3BrowserComponent,
    AgGridContextMenuComponent,
  ],
  entryComponents: [
    CreatDialogComponent,
    CreatFolderComponent,
    DeleteDialogComponent,
  ],
  imports: [
    AgGridModule,
    BrowserModule,
    MaterialModule,
    ResizableModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
