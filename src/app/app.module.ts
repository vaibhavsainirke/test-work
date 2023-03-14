import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ResizableModule } from 'angular-resizable-element';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AgGridModule } from 'ag-grid-angular';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { CreatDialogComponent } from './components/s3Buckets/creat-dialog/creat-dialog.component';
import { DeleteDialogComponent } from './components/s3Buckets/delete-dialog/delete-dialog.component';
import { CreatFolderComponent } from './components/s3Objects/creat-folder/creat-folder.component';

import 'ag-grid-enterprise';

@NgModule({
  declarations: [AppComponent, CreatDialogComponent, DeleteDialogComponent, CreatFolderComponent ],
  entryComponents: [DeleteDialogComponent, CreatDialogComponent,CreatFolderComponent],
  imports: [
    AgGridModule,
    BrowserModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ResizableModule,
    MatDialogModule,
    MatSelectModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
