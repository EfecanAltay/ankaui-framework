import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class BaseAPIService {
  private environmentInjector = inject(EnvironmentInjector);

  // cors
  private createHeader(): HttpHeaders {
    return new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Content-Type": "application/json; charset=utf-8"
    });
  }

  getClient(): Observable<HttpClient> {
    return new Observable(observe => {
      runInInjectionContext(this.environmentInjector, () => {
        observe.next(inject(HttpClient)); // Do what you need with the injected service
      });
    });
  }

  Get<R>(url: string): Observable<R> {
    return new Observable<R>(observe => {
      this.getClient().subscribe(client => {
        client.get(url, { headers: this.createHeader() }).subscribe(
          {
            next: (data) => {
              observe.next((JSON.parse(data.toString()) as R));
            },
            error:
              (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  console.log('Client-side error occured.');
                } else {
                  console.log('Server-side error occured.');
                }
              }
          }
        );
      });

    });
  }

  Post<T, R>(url: string, data: T): Observable<R> {
    return new Observable<R>(observe => {
      this.getClient().subscribe(client => {
        client.post(url, JSON.stringify(data), { headers: this.createHeader() }).subscribe(
          {
            next: (data) => {
              observe.next((data as R));
            },
            error:
              (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  console.log('Client-side error occured.');
                } else {
                  console.log('Server-side error occured.');
                }
              }
          }
        );
      });

    });
  }
}