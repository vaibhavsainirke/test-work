import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { ResizeEvent } from 'angular-resizable-element';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CellClickedEvent,
  CellDoubleClickedEvent,
  ColDef,
  GetContextMenuItemsParams,
  GridReadyEvent,
  MenuItemDef,
} from 'ag-grid-community';
import Swal from 'sweetalert2';
import { EmptyService } from 'src/app/services/empty.service';
import { BucketsService } from 'src/app/services/buckets.service';
import { CreatDialogComponent } from '../s3Buckets/creat-dialog/creat-dialog.component';
import { DeleteDialogComponent } from '../s3Buckets/delete-dialog/delete-dialog.component';
import { CreatFolderComponent } from '../s3Objects/creat-folder/creat-folder.component';
import { AgGridContextMenuComponent } from './ag-grid-context-menu/ag-grid-context-menu.component';
import { TitleStrategy } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ContextMenuItemsService } from 'src/app/services/context-menu-items.service';
import { UploadDownloadService } from 'src/app/services/upload-download.service';

@Component({
  selector: 'app-s3-browser',
  templateUrl: './s3-browser.component.html',
  styleUrls: ['./s3-browser.component.scss'],
})
export class S3BrowserComponent implements OnInit {
  buckets: any;
  lastPath!: any;
  forEmptyPath: any;
  selectedBucket: any;
  singelObject: any = [];
  bucketObjects: any = [];
  newScreenTitle: any = '';
  newScreenObject: any = '';
  newScreenPath: any;
  resizeStyle: object = {};
  file:any[]=[];

  header: boolean = false;
  property: boolean = false;
  version: boolean = false;

  viewTable: boolean = true;
  viewNewScreen: boolean = false;

  public rowData!: any;
  public columnDefs: ColDef[] = [
    { field: 'Name', width: 255, cellRenderer: AgGridContextMenuComponent },
    { field: 'Size', width: 150 },
    { field: 'Type', width: 100 },
    { field: 'Last_Modified' },
    { field: 'Storage_class' },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  constructor(
    public creatBuckets: MatDialog,
    public deletBuckets: MatDialog,
    private domSanitizer: DomSanitizer,
    private emptyService: EmptyService,
    public creatFolderDialog: MatDialog,
    private bucketService: BucketsService,
    private matIconRegistry: MatIconRegistry,
    private uploadDownloadService: UploadDownloadService ,
    private contextMenuItemsService: ContextMenuItemsService
  ) {
    this.matIconRegistry.addSvgIcon(
      'bucket-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/svg/s3-bucket.svg'
      )
    );
  }

  ngOnInit(): void {
    this.lodeBuckets();
  }

  getContextMenuItems = (
    params: GetContextMenuItemsParams
  ): (string | MenuItemDef)[] => {
    var result: (string | MenuItemDef)[] = [
      {
        // custom item
        name: 'Headers',
        action: () => {
          if (params.value.charAt(params.value.length - 1) != '/') {
            this.viewTable = false;
            this.viewNewScreen = true;
            this.newScreenPath = this.lastPath;
            if (this.newScreenPath == null) {
              this.newScreenPath = '';
            }
            let passData = {
              BucketName: this.selectedBucket,
              FileName: this.newScreenPath + params.value,
            };
            this.contextMenuItemsService
              .getHeaders(passData)
              ?.subscribe((data: any) => {
                this.newScreenTitle = 'Header';
                this.newScreenObject = data.Result.Header;
                this.header = true;
                this.property = false;
                this.version = false;
              });
            console.log(this.newScreenObject);
          } else {
            alert('no');
          }
        },
      },
      {
        name: 'Version',
        action: () => {
          if (params.value.charAt(params.value.length - 1) != '/') {
            this.viewTable = false;
            this.viewNewScreen = true;
            this.newScreenPath = this.lastPath;
            if (this.newScreenPath == null) {
              this.newScreenPath = '';
            }
            let passData = {
              BucketName: this.selectedBucket,
              FileName: this.newScreenPath + params.value,
            };
            this.contextMenuItemsService
              .getHeaders(passData)
              ?.subscribe((data: any) => {
                this.newScreenTitle = 'Version';
                this.newScreenObject = data.Result.Version;
                this.version = true;
                this.header = false;
                this.property = false;
              });
            console.log(this.newScreenObject);
          } else {
            alert('no');
          }
        },
      },
      {
        // custom item
        name: 'Properties',
        action: () => {
          if (params.value.charAt(params.value.length - 1) != '/') {
            this.viewTable = false;
            this.viewNewScreen = true;
            this.newScreenPath = this.lastPath;
            if (this.newScreenPath == null) {
              this.newScreenPath = '';
            }
            let passData = {
              BucketName: this.selectedBucket,
              FileName: this.newScreenPath + params.value,
            };
            this.contextMenuItemsService
              .getHeaders(passData)
              ?.subscribe((data: any) => {
                this.newScreenTitle = 'Property';
                this.newScreenObject = data.Result.Property;
                this.property = true;
                this.header = false;
                this.version = false;
              });
            console.log(this.newScreenObject);
          } else {
            alert('no');
          }
        },
      },
    ];
    return result;
  };

  lodeBuckets() {
    this.bucketService.getBuckets()?.subscribe((data: any) => {
      if (data && data.Result) {
        this.buckets = data.Result;
      }
    });
  }

  back() {
    let ar = this.lastPath.split('/');
    if (ar[ar.length - 1] == '') {
      ar.pop();
    }
    ar.pop();
    this.lastPath = '';
    let path = ar.join('/') + '/';
    this.loadObjects(path);
  }

  loadObjects(param: any) {
    let bucketName = this.selectedBucket;
    this.viewTable = true;
            this.viewNewScreen = false;
    // let path=param
    if (param == null) {
      this.lastPath = null;
    } else {
      if (this.lastPath == null) {
        this.lastPath = '';
      }
      if (param == '/') {
        this.lastPath = null;
      } else {
        this.lastPath += param;
      }
    }
    this.forEmptyPath = this.lastPath;
    let passData = {
      bucketName: bucketName,
      folderPath: this.lastPath,
    };
    this.bucketService.setBucketName(passData);
    if (param == null) {
      this.bucketService.getObjects(passData)?.subscribe((data: any) => {
        if (data && data.Result) {
          this.bucketObjects = data.Result;
          this.rowData = this.bucketObjects;
          console.log(this.bucketObjects);
        }
      });
    } else {
      if (param !== null) {
        this.bucketService.getObjects(passData)?.subscribe((data: any) => {
          if (data && data.Result) {
            this.singelObject = data.Result;
            this.rowData = this.singelObject;
          }
        });
      }
    }
  }

  onBucketClick(bucket: string) {
    this.selectedBucket = bucket;
    this.loadObjects(null);
  }

  onCellClicked(event: CellClickedEvent): void {
    console.log('cellClicked', event);
    if (event.value.charAt(event.value.length - 1) === '/') {
      this.loadObjects(event.value);
    }
  }

  addBuckets() {
    this.creatBuckets.open(CreatDialogComponent);
  }

  deleteBucket() {
    this.deletBuckets.open(DeleteDialogComponent);
  }

  creatFolder() {
    this.creatFolderDialog.open(CreatFolderComponent);
  }

  onFileSelected(event: any) {
    for (var i = 0; i <event.target.files.length; i++) { 
      this.file.push(event.target.files[i]);
    }
    Swal.fire({
      text: "Upload file",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Upload!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.upload();
      }
    })
  }

  upload() { 
    const formData = new FormData();
    for (var i = 0; i < this.file.length; i++) { 
    formData.append('files', this.file[i])
    formData.append('folderPath', this.lastPath)
    formData.append('bucketName', this.selectedBucket)
    }
    this.uploadDownloadService.upload(formData)?.subscribe((data:any) => {   
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'File uploaded successfully'
        });
      }
    });
  }

  empty() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        let passData = {
          BucketName: this.selectedBucket,
          FolderPath: this.forEmptyPath,
        };
        this.emptyService.delete(passData)?.subscribe((data: any) => {
          console.log(data);
          if (data.Result.status == 1) {
            Swal.fire({
              icon: 'success',
              title: data.Result.message,
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: data.Result.message,
              showConfirmButton: true,
            });
          }
        });
      }
    });
  }

  closeNewScreen() {
    this.viewTable = true;
    this.viewNewScreen = false;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.resizeStyle = {
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`,
    };
  }
}
