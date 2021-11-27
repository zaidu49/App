import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AccountService } from "../../providers/accountService";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private _fb: FormBuilder, private router: Router, private avRoute: ActivatedRoute, private accountService: AccountService,) {
    this.registerForm = this._fb.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.registerForm = this._fb.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  register() {
    this.accountService.register(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          alert('User added');
          this.router.navigate(['/quiz-list']);
        },
        error: (error: any) => {
          alert("Error!!!!");
        }
      });
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
    return this.registerForm.controls;
  }

}

