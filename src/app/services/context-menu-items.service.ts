import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuItemsService {
  
  constructor(
    private httpService: HttpService,
    public constantService: ConstantService
  ) {}

  getHeaders(data: any) {
    let requestData = {
      API_URL: 'api/DataReport/get-object-metadata',
      REQUEST_METHOD: this.constantService.REQUEST_METHOD_POST,
      BODY: data
    };

    return this.httpService.sendRequest(requestData);
  }
}
