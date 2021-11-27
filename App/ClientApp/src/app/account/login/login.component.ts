import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../providers/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private _fb: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.accountService.login(this.loginForm.value)
      //.pipe(first())
      .subscribe(
        response => {
          console.log(response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        }
        //{
        //next: () => {
        //  alert('Logged In');
        //  //this.loading = false;
        //  this.router.navigate(['/']);
        //},
        //error: (error: any) => {
        //  alert("Error!!!!");
        //  //this.loading = false;
        //}
        //}
      );
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get f() {
    return this.loginForm.controls;
  }
}
