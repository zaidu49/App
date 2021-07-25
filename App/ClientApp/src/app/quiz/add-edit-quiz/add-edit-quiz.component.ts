import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Quiz } from '../../models/quiz';
import { QuestionService } from '../../providers/question.service';
import { QuizService } from '../../providers/quiz.service';

@Component({
  selector: 'app-add-edit-quiz',
  templateUrl: './add-edit-quiz.component.html',
  styleUrls: ['./add-edit-quiz.component.css']
})
export class AddEditQuizComponent implements OnInit {

  quizForm: FormGroup;
  title: string;
  quiz: Quiz = new Quiz();
  quizId: number;
  quizTitle: string;
  errorMessage: any;
  submitted = false;
  actionType: string;
  existingQuiz: Quiz;

  constructor(private _fb: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router,
    private quizService: QuizService)
  {
    this.actionType = 'Add';
    if (this.avRoute.snapshot.params["id"]) {
      this.quizId = this.avRoute.snapshot.params["id"];
    }

    this.quizForm = this._fb.group({
      quizId: 0,
      quizTitle: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    if (this.quizId > 0) {
      this.actionType = 'Edit';
      this.quizService.getQuiz(this.quizId)
        .subscribe(data => (
          this.existingQuiz = data,
          //this.questionForm.controls['questionText'].setValue(data.questionText),
          //this.questionForm.controls[this.questionText].setValue(data.questionText),
          this.quizForm.controls['quizTitle'].setValue(data.quizTitle)
        ));
    }

    this.quizForm = this._fb.group({
      quizTitle: ['', Validators.required]
    });

  }

  onSubmit() {


    this.submitted = true;
    this.quiz.quizTitle = this.quizForm.value.quizTitle;

    if (this.quizForm.invalid) {
      return;
    }

    if (this.actionType === 'Add') {
      this.quizService.saveQuiz(this.quizForm.value)
        .pipe(first())
        .subscribe({
          next: () => {
            alert('Quiz added');
            //this.loading = false;
            this.router.navigate(['/quiz-list']);
          },
          error: (error: any) => {
            alert("Error!!!!");
            //this.loading = false;
          }
        });
    }

    if (this.actionType === 'Edit') {

      this.quiz.quizId = this.existingQuiz.quizId;
      this.quizService.updateQuiz(this.quizId, this.quiz)
        .subscribe((data) => {
          this.router.navigate(['/quiz-list']);
        });
    }

  }

  cancel() {
    this.router.navigate(['/quiz-list']);
  }

  get f() {
    return this.quizForm.controls;
  }

}
