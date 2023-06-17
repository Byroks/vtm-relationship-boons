import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Boons } from 'src/app/boons';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000';

  getDefaultWeights(): Observable<Boons> {
    return this.http.get<Boons>(`${this.url}/api/default-weights`);
  }

  postUploadFile(file: any): Observable<any> {
    return this.http.post(`${this.url}/api/file-upload`, file);
  }
}
