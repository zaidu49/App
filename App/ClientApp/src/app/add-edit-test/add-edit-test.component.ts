import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Test } from '../models/test';
import { TestService } from '../providers/test.service';

@Component({
  selector: 'app-add-edit-test',
  templateUrl: './add-edit-test.component.html',
  styleUrls: ['./add-edit-test.component.css']
})
export class AddEditTestComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  testId: number;
  errorMessage: any;
  existingTest: Test;

  constructor(private testService: TestService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router)
  {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formBody = 'body';
    if (this.avRoute.snapshot.params[idParam]) {
      this.testId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        testId: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {
    if (this.testId > 0) {
      this.actionType = 'Edit';
      this.testService.getTest(this.testId)
        .subscribe(data => (
          this.existingTest = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formBody].setValue(data.body)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let test: Test = {
        //dt: new Date(),
        creator: 'Zaid',
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };

      this.testService.saveTest(test)
        .subscribe((data) => {
          this.router.navigate(['/test', data.testId]);
        });
    }

    if (this.actionType === 'Edit') {
      let test: Test = {
        testId: this.existingTest.testId,
        //dt: this.existingTest.dt,
        creator: this.existingTest.creator,
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };
      this.testService.updateTest(test.testId, test)
        .subscribe((data) => {
          this.router.navigate(['/test']);
          //console.log("11" + this.router.url);
          //this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get body() { return this.form.get(this.formBody); }

}
