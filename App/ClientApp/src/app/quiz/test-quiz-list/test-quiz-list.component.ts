import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Quiz } from '../../models/quiz';
import { QuizService } from '../../providers/quiz.service';

@Component({
  selector: 'app-test-quiz-list',
  templateUrl: './test-quiz-list.component.html',
  styleUrls: ['./test-quiz-list.component.css']
})
export class TestQuizListComponent implements OnInit {

  quizzes: Observable<Quiz[]>;

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.getQuizzesByUser();
  }

  getQuizzesByUser() {
    this.quizzes = this.quizService.getQuizzesByUser();
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
        this.getQuizzesByUser();
      });
    }
  }

  clickAddQuiz() {
    this.router.navigate(['/add-edit-quiz']);
  }
}
