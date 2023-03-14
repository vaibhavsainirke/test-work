import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BucketsService } from 'src/app/services/buckets.service';
import { CreatBucketService } from 'src/app/services/creat-bucket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creat-dialog',
  templateUrl: './creat-dialog.component.html',
  styleUrls: ['./creat-dialog.component.scss'],
})
export class CreatDialogComponent implements OnInit {
  regions: any;
  buckets: any;
  requestBuckets: any;
  selectedBucket: any = '';
  selectedRegion: any = '';

  bucketForm = new FormGroup({
    bucket_name: new FormControl(''),
    bucket_region: new FormControl(''),
  });

  constructor(
    private bucketService: BucketsService,
    private creatBucketService: CreatBucketService
  ) {}

  ngOnInit(): void {
    this.loadBuckets();
    this.loadRegion();
  }

  loadBuckets() {
    this.bucketService.getBuckets()?.subscribe((data) => {
      this.requestBuckets = data;
      this.buckets = this.requestBuckets.Result;
    });
  }

  loadRegion() {
    this.bucketService.getRegion()?.subscribe((data) => {
      this.regions = data;
    });
  }

  creatBucket() {
    let passData = {
      bucketName: this.selectedBucket,
      region: this.selectedRegion,
    };
    this.creatBucketService.creatBucket(passData)?.subscribe((data: any) => {
      console.log(data);
      if (
        data.Result.status == 1
      ) {
        Swal.fire({
          icon: 'success',
          title: data.Result.message,
          showConfirmButton: true,
        });
      } else{
        Swal.fire({
          icon: 'error',
          title: data.Result.message,
          showConfirmButton: true,
        });
      }
    });
  }
}
