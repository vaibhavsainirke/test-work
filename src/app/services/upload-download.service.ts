import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UploadDownloadService {

  constructor(
    private httpService: HttpService,
    private httpClient: HttpClient,
    public constantService: ConstantService
  ) {}

  upload(data:any){
    let url='https://localhost:5001/api/DataReport/upload-file'

    return this.httpClient.post(url,data);
  }
}
