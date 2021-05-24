import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  baseUrl = '/api';

  constructor(private http: HttpClient) {}
  testCode(body) {
    return this.http.post(this.baseUrl + '/testCode', body);
  }
  getCode() {
    return this.http.get(this.baseUrl + '/getCode/60ab913b6a62e323a006865f');
  }
}
