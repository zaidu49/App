import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from '../../providers/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private _fb: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) {
    this.registerForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }


    this.accountService.register(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          alert('User added');
          //this.loading = false;
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          alert("Error!!!!");
          //this.loading = false;
        }
      });

  }
  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['/login']);
  }

  get f() {
    return this.registerForm.controls;
  }


}
