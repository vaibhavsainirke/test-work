import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    public constantService: ConstantService
  ) {}

  sendRequest(requestData: any) {
    let httpOptions = {};

    let url = this.constantService.SERVER_ROOT_URL + requestData.API_URL;

    httpOptions = {
      withCredentials: false,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    if (requestData.REQUEST_METHOD == this.constantService.REQUEST_METHOD_GET) {
      return this.httpClient.get(url, httpOptions);
    } else if (
      requestData.REQUEST_METHOD == this.constantService.REQUEST_METHOD_POST
    ) {
      return this.httpClient.post(url, requestData.BODY, httpOptions);
    } else if (
      requestData.REQUEST_METHOD == this.constantService.REQUEST_METHOD_PUT
    ) {
      return this.httpClient.put(url, requestData.BODY, httpOptions);
    } else if (
      requestData.REQUEST_METHOD == this.constantService.REQUEST_METHOD_DELETE
    ) {
      return this.httpClient.delete(url, httpOptions);
    } else {
      return null;
    }
  }
}