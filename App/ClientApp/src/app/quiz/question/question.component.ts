import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Question } from '../../models/question';
import { QuestionService } from '../../providers/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionForm: FormGroup;
  title: string;
  question: Question = new Question();
  questionId: number;
  questionText: string;
  errorMessage: any;
  submitted = false;
  actionType: string;
  existingQuestion: Question;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute, private _router: Router, private questionService: QuestionService)
  {
    this.actionType = 'Add';
    if (this._avRoute.snapshot.params["id"]) {
      this.questionId = this._avRoute.snapshot.params["id"];
    }

    this.questionForm = this._fb.group({
      questionId: 0,
      questionText: ['', [Validators.required]],
    })
  }

  ngOnInit() {

    if (this.questionId > 0) {
      this.actionType = 'Edit';
      this.questionService.getQuestion(this.questionId)
        .subscribe(data => (
          this.existingQuestion = data,
          //this.questionForm.controls['questionText'].setValue(data.questionText),
          //this.questionForm.controls[this.questionText].setValue(data.questionText),
          this.questionForm.controls['questionText'].setValue(data.questionText)
        ));
    }

    this.questionForm = this._fb.group({
      questionText: ['', Validators.required]
    });
    
  }


  onSubmit() {


    this.submitted = true;
    this.question.questionText = this.questionForm.value.questionText;

    if (this.questionForm.invalid) {
      return;
    }
    if (this.actionType === 'Add')
    {
      this.questionService.saveQuestion(this.questionForm.value)
        .pipe(first())
        .subscribe({
          next: () => {
            alert('Question added');
            //this.loading = false;
            // this.router.navigate(['/login']);
          },
          error: (error: any) => {
            alert("Error!!!!");
            //this.loading = false;
          }
        });
    }

    if (this.actionType === 'Edit') {

      this.question.questionId = this.existingQuestion.questionId;
      this.questionService.updateQuestion(this.questionId, this.question)
        .subscribe((data) => {
          this._router.navigate([this._router.url]);
        });
    }

  }

  cancel() {
    this._router.navigate(['/']);
  }

  get f() {
    return this.questionForm.controls;
  }

}
