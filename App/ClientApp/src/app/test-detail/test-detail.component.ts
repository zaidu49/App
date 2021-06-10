import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Test } from '../models/test';
import { TestService } from '../providers/test.service';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css']
})
export class TestDetailComponent implements OnInit {
  testDetail$: Observable<Test>;
  testId: number;

  constructor(private testService: TestService, private avRoute: ActivatedRoute)
  {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.testId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadBlogPost();
  }

  loadBlogPost() {
    this.testDetail$ = this.testService.getTest(this.testId);
  }
}
