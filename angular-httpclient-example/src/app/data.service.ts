import { Injectable } from '@angular/core';

/** Llamadas HTTP a servicios */
import { HttpClient, HttpErrorResponse, HttpParams  } from '@angular/common/http';

/** Manejo de errores */
import { throwError } from 'rxjs';
import { retry, catchError, tap  } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /************************
   * PAGINACION
   */
  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";
  /************************/

  private REST_API_SERVER = "http://localhost:3000/products";

  constructor(private httpClient: HttpClient) { }

  /**
   * define the parseLinkHeader() method which parses the Link 
   * header and populate the previous variables accordingly
   * @param header 
   */
  parseLinkHeader(header) {
    if (header.length == 0) {
      return;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach(p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    this.first = links["first"];
    this.last = links["last"];
    this.prev = links["prev"];
    this.next = links["next"];
  }

  /**
   * You can use the RxJS retry() operator by piping it (using the pipe() method) 
   * onto the Observable returned from the HttpClient method before the error handler.
   * 
   * This will retry sending the failed HTTP request three times.
   */
  public sendGetRequest(){

    /**
     * We added the observe option with the response value in the 
     * options parameter of the get() method so we can have the full
     * HTTP response with headers. Next, we use the RxJS tap() operator 
     * for parsing the Link header before returning the final Observable.
     */
    return this.httpClient.get < Product[] > (this.REST_API_SERVER, {
      params: new HttpParams({
        fromString: "_page=1&_limit=3"
      }),
      observe: "response"
    }).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));

    }));
    
  }

  /**
   * This method is similar to sendGetRequest() except that it takes 
   * the URL to which we need to send an HTTP GET request.
   * 
   * @param url 
   */
  public sendGetRequestToUrl(url: string) {
    return this.httpClient.get < Product[] > (url, {
      observe: "response"
    }).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));

    }));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
