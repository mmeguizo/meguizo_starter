import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

//map is not working if not imported
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public domain = "http://localhost:3000";


  constructor(

    private http: HttpClient

  ) { }

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


  registerUser(user) {
    return this.http.post(this.domain + '/authentication/register', user)
    // return this.http.post(this.domain + '/authentication/register', user).pipe(map((response: any) => response.json())); //error if map is not imported
  }


  checkUsername(username) {
    return this.http.get(this.domain + '/authentication/checkUsername/' + username);
    // return this.http.post(this.domain + '/authentication/register', user).pipe(map((response: any) => response.json())); //error if map is not imported
  }



  checkEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail/' + email)
    // return this.http.post(this.domain + '/authentication/register', user).pipe(map((response: any) => response.json())); //error if map is not imported
  }





}



/*

 this.http.get(url)
      .subscribe((data: GithubUser) => {
        // Data extraction from the HTTP response is already done
        // Display the result
        console.log('TJ user data', data);
      });

      .map(response => response.json())
            .catch(error => Observable.throw("Error in x service"));

*/
