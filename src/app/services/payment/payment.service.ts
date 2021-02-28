import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IHttpResponse } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }


  public SaveCardDetails(card): Observable<IHttpResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // return this.http.post<IHttpResponse>('https://api.mocki.io/v1/de6c1226', card, { headers })  // Request with 400 Response
    return this.http.post<IHttpResponse>('https://api.mocki.io/v1/e3a1b5d3', card, { headers })  // Request with 200 Response
      .pipe(
        retry(3),  // if call failed then retry it for 3 more times
        catchError(this.handleError)  // if error exist then based on the type of error throw error subscriber
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);

    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    // Return an observable with a user-facing error message.
    return throwError('Something bad happened, please try again later.');
  }
}
