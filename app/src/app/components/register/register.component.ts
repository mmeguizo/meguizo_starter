import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { paths } from 'src/app/app-paths';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({

    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),

  });


  public data: void;
  public registerUserData: any;
  public json
  public messageClass;
  public alertMessages;
  public processing: boolean = false;
  public emailValid;
  public emailMessage;
  public usernameValid;
  public usernameMessage;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.createForm(); // Create Angular 2 Form when component loads
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
    //  window.alert(errorMessage);

    return throwError(this.usernameMessage = errorMessage);
  }



  // Function to create registration form
  createForm() {

    this.form = this.formBuilder.group({

      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateEmail // Custom validation
      ])],
      username: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
        this.validateUsername // Custom validation
      ])],
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        this.validatePassword // Custom validation
      ])],
      // Confirm Password Input
      confirm: ['', [Validators.required, this.matchingPasswords.bind(this)]] // Field is required

    })

  }


  // Function to disable the registration form
  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }


  // Function to validate e-mail is proper format
  validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (!controls.value) { return { 'validateEmail': true } }

    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }

  // Function to validate username is proper format
  validateUsername(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);

    if (!controls.value) { return { 'validateUsername': true } }
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateUsername': true } // Return as invalid username
    }
  }

  // Function to validate password
  validatePassword(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePassword': true } // Return as invalid password
    }
  }

  matchingPasswords(control: FormControl) {
    return control.value === this.form.get('password').value ? null : { matchingPasswords: true }
  }


  onRegisterSubmit(form) {

    this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    this.disableForm(); // Disable the form

    const user = {

      email: form.value.email,
      username: form.value.username,
      password: form.value.password,

    }


    this.auth.registerUser(user).subscribe((res: any) => {

      if (res.success) {
        this.registerUserData = res.data
        this.toastr.success('Success', res.message);

        setTimeout(() => {
          //  this.router.navigateByUrl('/home');
          //  this.router.navigateByUrl('login', { skipLocationChange: false });
          //this.router.navigate['login']
          this.router.navigateByUrl('login', { skipLocationChange: false });
        }, 2000)
      } else {
        this.toastr.error('Failed', res.message);
        this.processing = false; // Re-enable submit button
        this.enableForm(); // Re-enable form
      }

    })

  }


  checkEmail() {

    this.auth.checkEmail(this.form.get('email').value).subscribe((res: any) => {

      if (res.success) {
        this.emailValid = true;
        this.emailMessage = res.message
      } else {
        this.emailValid = false;
        this.emailMessage = res.message
      }
    })

  }
  checkUsername() {

    if (this.form.get('username')) {
      this.auth.checkUsername(this.form.get('username').value).subscribe((res: any) => {
        if (res.success) {
          this.usernameValid = true;
          this.usernameMessage = res.message
        } else {
          this.usernameValid = false;
          this.usernameMessage = res.message
        }
      })
    }

  }


  ngOnInit() {
  }

  handleClear() {
    this.form.reset()
  }





}


// export function matchingPasswords(control: AbstractControl) {

//   console.log({ matchingPasswords: control.value });

//   return { matchingPasswords: true }

//   // if (control.value == 13445) {
//   //   return { matchingPasswords: true }
//   // }
//   // return null;
// }
