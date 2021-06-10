import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionForm: FormGroup;
  title: string = "Add";
  questionId: number;
  errorMessage: any;
  //cityList: Array<any> = [];

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute, private _router: Router)
  {
    if (this._avRoute.snapshot.params["id"]) {
      this.questionId = this._avRoute.snapshot.params["id"];
    }

    this.questionForm = this._fb.group({
      employeeId: 0,
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      department: ['', [Validators.required]],
      //city: ['', [Validators.required]]
    })
  }

  ngOnInit() {

    //this._employeeService.getCityList().subscribe(
    //  data => this.cityList = data
    //)

    //if (this.employeeId > 0) {
    //  this.title = "Edit";
    //  this._employeeService.getEmployeeById(this.employeeId)
    //    .subscribe(resp => this.employeeForm.setValue(resp)
    //      , error => this.errorMessage = error);
    //}
  }

  save() {

    console.log("It's working");
    //if (!this.employeeForm.valid) {
    //  return;
    //}

    //if (this.title == "Create") {
    //  this._employeeService.saveEmployee(this.employeeForm.value)
    //    .subscribe((data) => {
    //      this._router.navigate(['/employee']);
    //    }, error => this.errorMessage = error)
    //}
    //else if (this.title == "Edit") {
    //  this._employeeService.updateEmployee(this.employeeForm.value)
    //    .subscribe((data) => {
    //      this._router.navigate(['/employee']);
    //    }, error => this.errorMessage = error)
    //}
  }

  cancel() {
    this._router.navigate(['/']);
  }

  get name() { return this.questionForm.get('name'); }
  get gender() { return this.questionForm.get('gender'); }
  get department() { return this.questionForm.get('department'); }
  //get city() { return this.questionForm.get('city'); }

}
