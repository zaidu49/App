import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AccountService } from "../../providers/accountService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private router: Router, private avRoute: ActivatedRoute, private accountService: AccountService,) {
    this.loginForm = this._fb.group({
      //email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      //fullname: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit() {

    if (localStorage.getItem('token') != null)
      this.router.navigate(['/quiz-list']);

    this.loginForm = this._fb.group({
      //email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      //fullname: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.accountService.login(this.loginForm.value)
      .subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          alert('Logged In');
          this.router.navigate(['/quiz-list']);
        },
        err =>
        {
          if (err.status == 400) {
            alert('Incorrect username or password');
          }
          else {
            console.log(err);
          }
        }
      );
  }

  //register() {
  //  this.accountService.register(this.registerForm.value)
  //    .pipe(first())
  //    .subscribe({
  //      next: () => {
  //        alert('User added');
  //        this.router.navigate(['/quiz-list']);
  //      },
  //      error: (error: any) => {
  //        alert("Error!!!!");
  //      }
  //    });
  //}

  cancel() {
    this.router.navigate(['/']);
  }

  get f() {
    return this.loginForm.controls;
  }

}

