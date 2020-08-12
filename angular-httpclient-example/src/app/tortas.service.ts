import { Injectable } from '@angular/core';

/** Llamadas HTTP a servicios */
import { HttpClient, HttpErrorResponse, HttpParams  } from '@angular/common/http';

/** Manejo de errores */
import { throwError } from 'rxjs';
import { retry, catchError, tap  } from 'rxjs/operators';

import { Torta } from './torta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TortasService {

  /**
   * Endpoint
   */
  private REST_API_SERVER = "localhost:8080/Tortas/ObtenerTortas";

  /**
   * Constructor
   * @param httpClient 
   */
  constructor(private httpClient: HttpClient) { }

  public sendPostRequest() : Observable<Torta[]> {

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify("person");
    return this.httpClient.post < Torta[] > (this.REST_API_SERVER,  {
        "categoria": "test"
      })
      .pipe(retry(3), catchError(this.handleError));
  }

  /** MANEJO DE ERRORES */
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
