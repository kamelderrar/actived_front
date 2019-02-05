import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap, timeout, timeoutWith} from "rxjs/internal/operators";
import {throwError} from "rxjs/index";
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class FactureService {
    API_URL: string = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getAvailableFacturesStatus(){
        let url = this.API_URL + '/facture/status';
        return this.http
            .get(url)
            .pipe(tap(res => res), catchError(this.handleError));
    }

    // recupertion des factures paginées
    getFactures(perPage, page, searchFilters): any {
        const params = {
            limit: perPage,
            page: page,
            filter: searchFilters
        };

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };

        let url = this.API_URL + '/facture';

        return this.http
            .post(url, params, httpOptions)
            .pipe(catchError(this.handleError));
    }

    // suppression de ligne de facture
    deleteFacture(id) {
        let url = this.API_URL + '/facture/delete/' + id;
        return this.http
            .get(url)
            .pipe(tap(res => res));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            console.log(error)
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}
