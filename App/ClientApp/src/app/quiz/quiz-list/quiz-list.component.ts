import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Quiz } from '../../models/quiz';
import { QuizService } from '../../providers/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  quizzes: Observable<Quiz[]>;

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.getAllQuizzes();
  }

  getAllQuizzes() {
    this.quizzes = this.quizService.getAllQuizzes();
  }
  //getAllQuizzes() {
  //  this.quizService.getAllQuizzes().subscribe(res => {
  //    this.quizzes = res;
  //  })
  //}


  delete(quizId) {
    const ans = confirm('Do you want to delete quiz with id: ' + quizId);
    if (ans) {
      this.quizService.deleteQuiz(quizId).subscribe((data) => {
        this.getAllQuizzes();
      });
    }
  }

  clickAddQuiz() {
    this.router.navigate(['/add-edit-quiz']);
  }

}
