import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteBucketService {

  constructor(
    private httpService: HttpService,
    public constantService: ConstantService
  ) {}

  deleteBucket(data:any){
    let requestData = {
      API_URL: 'api/DataReport/delete-s3-bucket',
      REQUEST_METHOD: this.constantService.REQUEST_METHOD_POST,
      BODY: data
    };

    return this.httpService.sendRequest(requestData);
  }
}
