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

  constructor(private _fb: FormBuilder, private avRoute: ActivatedRoute, private router: Router, private questionService: QuestionService)
  {
    this.actionType = 'Add';
    if (this.avRoute.snapshot.params["id"]) {
      this.questionId = this.avRoute.snapshot.params["id"];
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
          this.questionForm.controls['questionText'].setValue(data.questionText),
          this.questionForm.controls['correctAnswer'].setValue(data.correctAnswer),
          this.questionForm.controls['answer1'].setValue(data.answer1),
          this.questionForm.controls['answer2'].setValue(data.answer2),
          this.questionForm.controls['answer3'].setValue(data.answer3)
        ));
    }

    this.questionForm = this._fb.group({
      questionText: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required]
    });
    
  }


  onSubmit() {


    this.submitted = true;
    this.question.questionText = this.questionForm.value.questionText;
    this.question.correctAnswer = this.questionForm.value.correctAnswer;
    this.question.answer1 = this.questionForm.value.answer1;
    this.question.answer2 = this.questionForm.value.answer2;
    this.question.answer3 = this.questionForm.value.answer3;

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
            this.router.navigate(['/question-list']);
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
          this.router.navigate(['/question-list']);
          //this.router.navigate([this.router.url]);
        });
    }

  }

  cancel() {
    this.router.navigate(['/question-list']);
  }

  get f() {
    return this.questionForm.controls;
  }

}
