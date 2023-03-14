import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmptyService {

  constructor(
    private httpService: HttpService,
    public constantService: ConstantService
  ) {}

  delete(data:any){
    let requestData = {
      API_URL: 'api/DataReport/empty-s3-bucket',
      REQUEST_METHOD: this.constantService.REQUEST_METHOD_POST,
      BODY: data
    };

    return this.httpService.sendRequest(requestData);
  }
}
