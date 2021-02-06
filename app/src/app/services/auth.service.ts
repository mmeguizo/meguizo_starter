import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
//map is not working if not imported
import { map } from "rxjs/operators";




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public domain = "http://localhost:3000";
  authToken;
  user;
  options;

  constructor(

    private http: HttpClient,
    public jwtHelper: JwtHelperService

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



  createAuthenticationHeaders() {

    this.loadToken();
    this.options = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.authToken
    })


  }


  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  registerUser(user) {
    return this.http.post('/authentication/register', user)
    // return this.http.post(this.domain + '/authentication/register', user)
  }


  checkUsername(username) {
    return this.http.get('/authentication/checkUsername/' + username);
    // return this.http.get(this.domain + '/authentication/checkUsername/' + username);
  }



  checkEmail(email) {
    return this.http.get('/authentication/checkEmail/' + email)
    // return this.http.get(this.domain + '/authentication/checkEmail/' + email)
  }

  // Function to login user
  login(user) {
    return this.http.post(this.domain + '/authentication/login', user)
    // return this.http.post(this.domain + '/authentication/login', user)
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();

  }

  loggedOut() {

    return this.jwtHelper.isTokenExpired()

  }


  // Function to store user's data in client local storage
  storeUserData(token, user, tokenUsername) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('tokenUsername', user.username); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

  getTokenUsername() {
    return localStorage.getItem('tokenUsername');
  }


  getProfile() {

    //this.options => is not working but with {headers : this.options} is working i read it i guess in angular docs
    //'@auth0/angular-jwt'; is adding 'Bearer ' in token so i removed it manually
    this.createAuthenticationHeaders()
    return this.http.get('/authentication/profile', { headers: this.options })
    // return this.http.get(this.domain + '/authentication/profile', { headers: this.options })

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
