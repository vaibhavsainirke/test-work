import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { ResizeEvent } from 'angular-resizable-element';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CellClickedEvent, ColDef, GetContextMenuItemsParams, GridReadyEvent, MenuItemDef } from 'ag-grid-community';

import { EmptyService } from './services/empty.service';
import { BucketsService } from './services/buckets.service';

import { CreatDialogComponent } from './components/s3Buckets/creat-dialog/creat-dialog.component';
import { DeleteDialogComponent } from './components/s3Buckets/delete-dialog/delete-dialog.component';
import { CreatFolderComponent } from './components/s3Objects/creat-folder/creat-folder.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  buckets: any;
  forEmptyPath: any;
  lastPath!: any;
  selectedBucket: any;
  singelObject: any = [];
  bucketObjects: any = [];
  selectedFiles: any;
  resizeStyle: object = {};

  public rowData!: any;
  public columnDefs: ColDef[] = [
    { field: 'Name', width: 255 },
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
  ) {
    this.matIconRegistry.addSvgIcon(
      'bucket-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/svg/s3-bucket.svg'
      )
    );
  }






  getContextMenuItems(
    params: GetContextMenuItemsParams
  ): (string | MenuItemDef)[] {
    var result: (string | MenuItemDef)[] = [
      {
        name: 'Permissions',
        action: () => {
          window.alert('Alerting about ' + params.value);
        },
      },'separator',
      {
        name: 'Headers',
        action: () => {
          window.alert('Alerting about ' + params.value);
        },
      },
      'separator',
      {
        name: 'Tags',
        action: () => {
          window.alert('Alerting about ' + params.value);
        },
      },
      'separator',
      {
        name: 'Preview',
        action: () => {
          window.alert('Alerting about ' + params.value);
        },
      },
      'separator',
      {
        name: 'Properties',
        action: () => {
          window.alert('Alerting about ' + params.value);
        },
      },
    ];
    return result;
  }



  
  ngOnInit(): void {
    this.lodeBuckets();
  }

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
    this.selectedFiles = event.target.files.item(0);
    console.log(this.selectedFiles);
  }

  empty() {
    console.log(this.selectedBucket);
    console.log(this.forEmptyPath);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let passData = {
          BucketName: this.selectedBucket,
          FolderPath: this.forEmptyPath,
        };
        this.emptyService.delete(passData)?.subscribe((data: any) => {
          console.log(data);
          if(data.Result.status==1){
            Swal.fire({
              icon: 'success',
              title: data.Result.message,
              showConfirmButton: true,
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: data.Result.message,
              showConfirmButton: true,
            })
          }
        });
      }
    })
  }

  onResizeEnd(event: ResizeEvent): void {
    this.resizeStyle = {
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`,
    };
  }
}
