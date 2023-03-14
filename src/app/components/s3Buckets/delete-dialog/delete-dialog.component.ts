import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { BucketsService } from 'src/app/services/buckets.service';
import { DeleteBucketService } from 'src/app/services/delete-bucket.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  buckets: any;
  regions: any;
  requestBuckets: any;
  selectedName: any = '';
  deleteFlag: boolean = false;
  Confirm_deletion: boolean = true;

  constructor(
    private bucketService: BucketsService,
    private deleteBucketService: DeleteBucketService
  ) {}

  ngOnInit(): void {
    this.lodeBuckets();
    this.loadRegion();
  }

  lodeBuckets() {
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

  deleteBucket() {
    let passData = {
      BucketName: this.selectedName,
      deleteFlag: this.deleteFlag,
    };

    this.deleteBucketService.deleteBucket(passData)?.subscribe((data: any) => {
      console.log(data);
      if (
        data.Result.status == 1
      ) {
        Swal.fire({
          icon: 'success',
          title: data.Result,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: data.Result,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteFlag = true;
            let passData = {
              BucketName: this.selectedName,
              deleteFlag: this.deleteFlag,
            };
            this.deleteBucketService
              .deleteBucket(passData)
              ?.subscribe((data: any) => {
                if (data.Result) {
                  Swal.fire({
                    icon: 'success',
                    title: data.Result,
                    showConfirmButton: false,
                  });
                }
              });
          }
        });
      }
    });
  }

  conformDelete() {
    this.Confirm_deletion = !this.Confirm_deletion;
  }
}
