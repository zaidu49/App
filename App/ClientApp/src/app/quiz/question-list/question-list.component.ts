import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  quizId

  constructor(private questionService: QuestionService, private router: Router, private avRoute: ActivatedRoute) { }

  ngOnInit() {
    this.quizId = this.avRoute.snapshot.paramMap.get('quizId');
    this.getAllQuestions();
  }


  getAllQuestions() {
    this.questionData = this.questionService.getAllQuestions(this.quizId);
      //.subscribe(res => {
      //  this.questions = res;
      //})
  }
  delete(questionId) {
    const ans = confirm('Do you want to delete question with id: ' + questionId);
    if (ans) {
      this.questionService.deleteQuestion(questionId).subscribe((data) => {
        this.getAllQuestions();
      });
    }

  }
  clickAddQuestion() {
    console.log("adding" + this.quizId);
    this.router.navigate(['/question',this.quizId]);
  }
}
