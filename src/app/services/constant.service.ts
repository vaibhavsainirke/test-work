import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {
  REQUEST_METHOD_GET: string = 'GET';
  REQUEST_METHOD_PUT: string = 'PUT';
  REQUEST_METHOD_POST: string = 'POST';
  REQUEST_METHOD_DELETE: string = 'DELETE';

  SERVER_ROOT_URL: string = environment.SERVER_ROOT_URL;
}