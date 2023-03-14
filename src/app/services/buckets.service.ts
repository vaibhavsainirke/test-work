import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ConstantService } from './constant.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BucketsService {

  passData:any;

  constructor(
    private httpService: HttpService,
    public constantService: ConstantService
  ) {}

  getBuckets() {
    let requestData = {
      API_URL: 'api/DataReport/get-s3-bucket-name',
      REQUEST_METHOD: this.constantService.REQUEST_METHOD_GET,
    };

    return this.httpService.sendRequest(requestData);
  }

  getRegion() {
    let requestData = {
      API_URL: 'api/DataReport/get-s3-region',
      REQUEST_METHOD: this.constantService.REQUEST_METHOD_GET,
    };

    return this.httpService.sendRequest(requestData);
  }

  getObjects(data: any) {
    let requestData = {
      API_URL: 'api/DataReport/get-s3-object',
      REQUEST_METHOD: this.constantService.REQUEST_METHOD_POST,
      BODY: data
    };

    return this.httpService.sendRequest(requestData);
  }

  setBucketName(data:any){
    this.passData=data;
  }

  getBucketName(){
    return this.passData;
  }
}
