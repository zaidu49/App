import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../models/test';
import { TestService } from '../providers/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  tests$: Observable<Test[]>;

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.loadTests();
  }

  loadTests() {
    this.tests$ = this.testService.getTests();
  }

  delete(testId) {
    const ans = confirm('Do you want to delete test with id: ' + testId);
    if (ans) {
      this.testService.deleteTest(testId).subscribe((data) => {
        this.loadTests();
      });
    }
  }

}
