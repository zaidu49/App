import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from '../../models/question';
import { QuestionService } from '../../providers/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questionData: Observable<Question[]>;

  constructor(private questionService: QuestionService, private router: Router) { }

  ngOnInit() {
    this.getAllQuestions();
  }


  getAllQuestions() {
    this.questionData = this.questionService.getAllQuestions();
      //.subscribe(res => {
      //  this.questions = res;
      //})
  }

  clickAddQuestion() {
    this.router.navigate(['/question']);
  }
}
