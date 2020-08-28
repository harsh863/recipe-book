import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  get<T>(path: string, data?: any): Observable<T> {
    return this._httpClient.get<T>(`${environment.baseUrl}${path}`, {params: data})
      .pipe(catchError(this.formatErrors));
  }

  post<T>(path: string, body: { [key: string]: any } = {}): Observable<T> {
    return this._httpClient.post<T>(`${environment.baseUrl}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  put<T>(path: string, body: { [key: string]: any } = {}): Observable<T> {
    return this._httpClient.put<T>(`${environment.baseUrl}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  delete<T>(path, body: { [key: string]: any } = {}): Observable<any> {
    return this._httpClient.delete<T>(`${environment.baseUrl}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors = (error: any) => {
    if (error.status === 401) {
      this._router.navigate(['/auth/logout']);
    }
    return throwError(error.error);
  }
}
