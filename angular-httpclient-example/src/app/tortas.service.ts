import { Injectable } from '@angular/core';

/** Llamadas HTTP a servicios */
import { HttpClient, HttpErrorResponse, HttpParams  } from '@angular/common/http';

/** Manejo de errores */
import { throwError } from 'rxjs';
import { retry, catchError, tap  } from 'rxjs/operators';

import { Torta } from './torta';

import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class TortasService {

  /**
   * Endpoint
   */
  private REST_API_SERVER = "http://localhost:8080/Tortas/ObtenerTortas";
  //private REST_API_SERVER = "http://localhost:3000/products";

  /**
   * Constructor
   * @param httpClient 
   */
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
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
