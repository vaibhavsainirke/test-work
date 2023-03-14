import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BucketsService } from 'src/app/services/buckets.service';
import { CreatS3FolderService } from 'src/app/services/creat-s3-folder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creat-folder',
  templateUrl: './creat-folder.component.html',
  styleUrls: ['./creat-folder.component.scss'],
})
export class CreatFolderComponent implements OnInit {
  buckets: any;
  addFolderData: any;
  selectedFolder: any = '';
  path: any;

  folderForm = new FormGroup({
    folder_name: new FormControl(''),
  });

  constructor(
    private bucketService: BucketsService,
    private creatS3Folder: CreatS3FolderService
  ) {}

  ngOnInit(): void {}

  lodeBuckets() {
    this.addFolderData = this.bucketService.getBucketName();
  }

  addFolder() {
    this.lodeBuckets();
    if (this.addFolderData.folderPath != null) {
      this.path = this.addFolderData.folderPath;
    }
    let passData = {
      BucketName: this.addFolderData.bucketName,
      FolderName: this.path + this.selectedFolder,
    };

    this.creatS3Folder.creatFolder(passData)?.subscribe((data: any) => {
      console.log(data);
      if (data.Result) {
        Swal.fire({
          icon: 'success',
          title: data.Result.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }
}
